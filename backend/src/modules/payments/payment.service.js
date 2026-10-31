import crypto from "crypto";
import { prisma } from "../../config/db.js";
import { initiateSSLCommerzPayment, verifySSLCommerzPayment } from "../../utils/sslcommerz.js";
import { env } from "../../config/env.js";

export const paymentService = {
  /**
   * 1. Initialize SSLCommerz Payment Session
   */
  async checkoutCourse({ courseId, userId }) {
    // 1. Fetch course directly from DB (Never trust frontend price!)
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || !course.isPublished) {
      throw { statusCode: 404, message: "Course not found or not currently available for enrollment", code: "COURSE_UNAVAILABLE" };
    }

    // 2. Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment && existingEnrollment.status === "ACTIVE") {
      throw { statusCode: 400, message: "You are already enrolled in this course", code: "ALREADY_ENROLLED" };
    }

    // 3. User details
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // 4. Calculate final price (Use discountPrice if set, otherwise price)
    const finalPrice = course.discountPrice ? Number(course.discountPrice) : Number(course.price);

    // 5. Generate unique Transaction ID
    const transactionId = `AURA_${Date.now()}_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    // 6. Create Pending Payment Record in DB
    const payment = await prisma.payment.create({
      data: {
        userId,
        courseId,
        transactionId,
        amount: finalPrice,
        currency: "BDT",
        status: "PENDING",
        gateway: "SSLCOMMERZ",
      },
    });

    // 7. Initiate Gateway Session
    const gatewaySession = await initiateSSLCommerzPayment({
      transactionId,
      amount: finalPrice,
      currency: "BDT",
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      courseTitle: course.title,
    });

    return {
      paymentId: payment.id,
      transactionId,
      amount: finalPrice,
      gatewayUrl: gatewaySession.gatewayUrl,
      isSimulated: gatewaySession.isSimulated || false,
    };
  },

  /**
   * 2. Complete Payment & Enroll Student in Prisma Transaction
   */
  async handlePaymentSuccess({ tran_id, val_id, rawBody }) {
    // Fetch pending payment
    const payment = await prisma.payment.findUnique({
      where: { transactionId: tran_id },
      include: { course: true, user: true },
    });

    if (!payment) {
      throw { statusCode: 404, message: "Payment record not found", code: "PAYMENT_NOT_FOUND" };
    }

    // Idempotency: If already marked SUCCESS, don't re-process!
    if (payment.status === "SUCCESS") {
      return { payment, alreadyProcessed: true };
    }

    // Validate server-side with SSLCommerz API if validation ID exists
    let isValid = true;
    let valData = rawBody;

    if (val_id && !env.SSLCommerz_STORE_ID.includes("mock") && !env.SSLCommerz_STORE_ID.includes("sandbox")) {
      const verification = await verifySSLCommerzPayment(val_id);
      isValid = verification.isValid;
      valData = verification.data;
    }

    if (!isValid) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED", gatewayResponse: valData },
      });
      throw { statusCode: 400, message: "Payment verification failed with gateway", code: "PAYMENT_VERIFICATION_FAILED" };
    }

    // Execute Enrollment and Payment update in an ACID Database Transaction
    const [updatedPayment, enrollment] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESS",
          valId: val_id || `VAL_${Date.now()}`,
          paidAt: new Date(),
          gatewayResponse: valData,
        },
      }),
      prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: payment.userId,
            courseId: payment.courseId,
          },
        },
        update: { status: "ACTIVE", enrolledAt: new Date() },
        create: {
          userId: payment.userId,
          courseId: payment.courseId,
          status: "ACTIVE",
        },
      }),
      prisma.notification.create({
        data: {
          userId: payment.userId,
          title: "Enrollment Confirmed!",
          message: `Congratulations! You have successfully enrolled in ${payment.course.title}. Start your first lesson now!`,
          type: "COURSE_ENROLLED",
          link: `/courses/${payment.course.slug}`,
        },
      }),
    ]);

    return { updatedPayment, enrollment };
  },

  /**
   * 3. Handle Payment Failure / Cancellation
   */
  async handlePaymentFailure(tran_id, status = "FAILED", reason = "") {
    const payment = await prisma.payment.findUnique({
      where: { transactionId: tran_id },
    });

    if (payment && payment.status === "PENDING") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status,
          gatewayResponse: { reason },
        },
      });
    }

    return payment;
  },
};

