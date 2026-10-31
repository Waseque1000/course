import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import courseRoutes from "../modules/courses/course.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import lessonRoutes from "../modules/lessons/lesson.routes.js";
import enrollmentRoutes from "../modules/enrollments/enrollment.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import progressRoutes from "../modules/progress/progress.routes.js";
import streakRoutes from "../modules/streaks/streak.routes.js";
import assignmentRoutes from "../modules/assignments/assignment.routes.js";
import submissionRoutes from "../modules/submissions/submission.routes.js";
import certificateRoutes from "../modules/certificates/certificate.routes.js";
import moderatorRoutes from "../modules/moderators/moderator.routes.js";
import analyticsRoutes from "../modules/analytics/analytics.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";

const apiRouter = Router();

// Mount all modules
apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/courses", courseRoutes);
apiRouter.use("/categories", categoryRoutes);
apiRouter.use("/lessons", lessonRoutes);
apiRouter.use("/enrollments", enrollmentRoutes);
apiRouter.use("/payments", paymentRoutes);
apiRouter.use("/progress", progressRoutes);
apiRouter.use("/streaks", streakRoutes);
apiRouter.use("/assignments", assignmentRoutes);
apiRouter.use("/submissions", submissionRoutes);
apiRouter.use("/certificates", certificateRoutes);
apiRouter.use("/moderators", moderatorRoutes);
apiRouter.use("/analytics", analyticsRoutes);
apiRouter.use("/notifications", notificationRoutes);

export default apiRouter;

