import { prisma } from "../../config/db.js";

export const courseService = {
  async listCourses({ category, minPrice, maxPrice, search, isPublished, page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (isPublished !== undefined) where.isPublished = isPublished;
    if (category) where.category = { slug: category };
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          _count: { select: { modules: true, enrollments: true } },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return {
      courses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getCourseBySlug(slug) {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        category: true,
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                title: true,
                slug: true,
                duration: true,
                order: true,
                isFree: true,
                // Do NOT expose private videoAssetId or playbackUrl to unauthorized users!
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    return course;
  },

  async createCourse(data, actorId) {
    const course = await prisma.course.create({
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: "COURSE_CREATED",
        resource: "Course",
        resourceId: course.id,
        details: { title: course.title },
      },
    });

    return course;
  },

  async updateCourse(id, data, actorId) {
    const course = await prisma.course.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: "COURSE_UPDATED",
        resource: "Course",
        resourceId: course.id,
      },
    });

    return course;
  },

  async deleteCourse(id, actorId) {
    const course = await prisma.course.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: "COURSE_DELETED",
        resource: "Course",
        resourceId: id,
      },
    });

    return course;
  },

  async togglePublish(id, isPublished, actorId) {
    const course = await prisma.course.update({
      where: { id },
      data: { isPublished },
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: isPublished ? "COURSE_PUBLISHED" : "COURSE_UNPUBLISHED",
        resource: "Course",
        resourceId: id,
      },
    });

    return course;
  },
};

