import { Router } from "express";
import { certificateService } from "./certificate.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

/**
 * Claim Certificate upon 100% course completion
 */
router.post("/claim", requireAuth, async (req, res, next) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      throw { statusCode: 400, message: "courseId is required" };
    }
    const certificate = await certificateService.claimCertificate({
      userId: req.user.id,
      courseId,
    });
    return sendSuccess(res, "Certificate claimed successfully", certificate, 201);
  } catch (error) {
    next(error);
  }
});

/**
 * Get current user's earned certificates
 */
router.get("/my-certificates", requireAuth, async (req, res, next) => {
  try {
    const certificates = await certificateService.getMyCertificates(req.user.id);
    return sendSuccess(res, "Certificates retrieved successfully", certificates);
  } catch (error) {
    next(error);
  }
});

/**
 * Public Verification Endpoint (No auth required)
 */
router.get("/verify/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const verifiedData = await certificateService.verifyCertificate(code);
    return sendSuccess(res, "Certificate verified successfully", verifiedData);
  } catch (error) {
    next(error);
  }
});

export default router;

