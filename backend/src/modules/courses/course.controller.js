import { courseService } from "./course.service.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const courseController = {
  async listCourses(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 20;
      const { category, minPrice, maxPrice, search } = req.query;

      // Public users and students only see published courses
      const isSuperAdmin = req.user?.role === "SUPER_ADMIN";
      const isPublished = isSuperAdmin && req.query.isPublished !== undefined
        ? req.query.isPublished === "true"
        : true;

      const result = await courseService.listCourses({
        category,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        search,
        isPublished,
        page,
        limit,
      });

      return sendSuccess(res, "Courses retrieved successfully", result);
    } catch (error) {
      next(error);
    }
  },

  async getCourseBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const course = await courseService.getCourseBySlug(slug);

      if (!course) {
        return sendError(res, "Course not found", "COURSE_NOT_FOUND", 404);
      }

      return sendSuccess(res, "Course details retrieved successfully", { course });
    } catch (error) {
      next(error);
    }
  },

  async createCourse(req, res, next) {
    try {
      const course = await courseService.createCourse(req.body, req.user.id);
      return sendSuccess(res, "Course created successfully", { course }, 201);
    } catch (error) {
      next(error);
    }
  },

  async updateCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await courseService.updateCourse(id, req.body, req.user.id);
      return sendSuccess(res, "Course updated successfully", { course });
    } catch (error) {
      next(error);
    }
  },

  async deleteCourse(req, res, next) {
    try {
      const { id } = req.params;
      await courseService.deleteCourse(id, req.user.id);
      return sendSuccess(res, "Course deleted successfully");
    } catch (error) {
      next(error);
    }
  },

  async togglePublish(req, res, next) {
    try {
      const { id } = req.params;
      const { isPublished } = req.body;
      const course = await courseService.togglePublish(id, isPublished, req.user.id);
      return sendSuccess(res, `Course ${isPublished ? "published" : "unpublished"} successfully`, { course });
    } catch (error) {
      next(error);
    }
  },
};

