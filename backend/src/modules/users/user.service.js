import { prisma } from "../../config/db.js";

export const userService = {
  async listUsers({ page = 1, limit = 20, role, status, search }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (role) where.role = role;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          assignedModerator: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { enrollments: true, submissions: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateAccountStatus(userId, status, actorId) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: `USER_STATUS_${status}`,
        resource: "User",
        resourceId: userId,
        details: { newStatus: status },
      },
    });

    // Send Notification to user
    await prisma.notification.create({
      data: {
        userId,
        title: status === "APPROVED" ? "Account Approved!" : "Account Status Update",
        message:
          status === "APPROVED"
            ? "Your student account has been approved. You now have full access to courses and assignments."
            : `Your account status has been changed to ${status}.`,
        type: status === "APPROVED" ? "ACCOUNT_APPROVED" : "ACCOUNT_REJECTED",
      },
    });

    return user;
  },

  async assignModerator(studentId, moderatorId, actorId) {
    const assignment = await prisma.user.update({
      where: { id: studentId },
      data: { assignedModeratorId: moderatorId },
    });

    await prisma.moderatorAssignment.upsert({
      where: {
        moderatorId_studentId: {
          moderatorId,
          studentId,
        },
      },
      update: { assignedAt: new Date() },
      create: {
        moderatorId,
        studentId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: "MODERATOR_ASSIGNED",
        resource: "ModeratorAssignment",
        details: { studentId, moderatorId },
      },
    });

    return assignment;
  },
};

