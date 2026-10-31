import { Router } from "express";
import { paymentService } from "./payment.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireApprovedStudent } from "../../middlewares/rbac.js";
import { sendSuccess } from "../../utils/response.js";
import { env } from "../../config/env.js";

const router = Router();

/**
 * 1. Initialize SSLCommerz Course Purchase Session
 */
router.post("/checkout", requireAuth, requireApprovedStudent, async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const checkoutResult = await paymentService.checkoutCourse({
      courseId,
      userId: req.user.id,
    });
    return sendSuccess(res, "Payment checkout session initialized", checkoutResult);
  } catch (error) {
    next(error);
  }
});

/**
 * 2. SSLCommerz Success Callback (Webhook / Redirect)
 */
router.post("/sslcommerz/success", async (req, res, next) => {
  try {
    const { tran_id, val_id } = req.body;
    const result = await paymentService.handlePaymentSuccess({
      tran_id,
      val_id,
      rawBody: req.body,
    });

    // In a browser redirect, redirect to frontend success page
    if (req.headers.accept?.includes("text/html")) {
      return res.redirect(`${env.FRONTEND_URL}/dashboard/student?enrolled=true&tran_id=${tran_id}`);
    }

    return sendSuccess(res, "Payment verified and course enrolled successfully", result);
  } catch (error) {
    if (req.headers.accept?.includes("text/html")) {
      return res.redirect(`${env.FRONTEND_URL}/payment/failed?error=${encodeURIComponent(error.message)}`);
    }
    next(error);
  }
});

/**
 * 3. SSLCommerz Fail Callback
 */
router.post("/sslcommerz/fail", async (req, res) => {
  const { tran_id, failedreason } = req.body;
  await paymentService.handlePaymentFailure(tran_id, "FAILED", failedreason);
  if (req.headers.accept?.includes("text/html")) {
    return res.redirect(`${env.FRONTEND_URL}/payment/failed?tran_id=${tran_id}`);
  }
  return res.status(400).json({ success: false, message: "Payment failed", error: { code: "PAYMENT_FAILED" } });
});

/**
 * 4. SSLCommerz Cancel Callback
 */
router.post("/sslcommerz/cancel", async (req, res) => {
  const { tran_id } = req.body;
  await paymentService.handlePaymentFailure(tran_id, "CANCELLED", "User cancelled checkout");
  if (req.headers.accept?.includes("text/html")) {
    return res.redirect(`${env.FRONTEND_URL}/payment/cancelled?tran_id=${tran_id}`);
  }
  return res.status(200).json({ success: false, message: "Payment cancelled by user" });
});

/**
 * 5. SSLCommerz IPN (Instant Payment Notification Webhook)
 */
router.post("/sslcommerz/ipn", async (req, res, next) => {
  try {
    const { tran_id, val_id, status } = req.body;
    if (status === "VALID" || status === "VALIDATED") {
      await paymentService.handlePaymentSuccess({ tran_id, val_id, rawBody: req.body });
    } else {
      await paymentService.handlePaymentFailure(tran_id, "FAILED", status);
    }
    return res.status(200).send("IPN_RECEIVED");
  } catch (error) {
    next(error);
  }
});

export default router;

