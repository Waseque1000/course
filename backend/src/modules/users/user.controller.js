import { userService } from "./user.service.js";
import { sendSuccess } from "../../utils/response.js";

export const userController = {
  async listUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 20;
      const { role, status, search } = req.query;

      const result = await userService.listUsers({ page, limit, role, status, search });
      return sendSuccess(res, "Users retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  },

  async approveStudent(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await userService.updateAccountStatus(id, "APPROVED", req.user.id);
      return sendSuccess(res, "Student account approved successfully", { user: updated });
    } catch (error) {
      next(error);
    }
  },

  async rejectStudent(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await userService.updateAccountStatus(id, "REJECTED", req.user.id);
      return sendSuccess(res, "Student account rejected", { user: updated });
    } catch (error) {
      next(error);
    }
  },

  async assignModerator(req, res, next) {
    try {
      const { studentId, moderatorId } = req.body;
      const result = await userService.assignModerator(studentId, moderatorId, req.user.id);
      return sendSuccess(res, "Student assigned to moderator successfully", { result });
    } catch (error) {
      next(error);
    }
  },
};

