import { prisma } from "../../config/db.js";

export const streakService = {
  /**
   * Record learning activity and update daily streak
   */
  async recordActivity(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Check if user already recorded streak for today
    const existingToday = await prisma.dailyStreak.findUnique({
      where: {
        userId_activityDate: {
          userId,
          activityDate: today,
        },
      },
    });

    if (existingToday) {
      // Already counted today! Just increment completed lesson counter for the day
      return prisma.dailyStreak.update({
        where: { id: existingToday.id },
        data: { lessonsCompleted: { increment: 1 } },
      });
    }

    // 2. Check yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStreak = await prisma.dailyStreak.findUnique({
      where: {
        userId_activityDate: {
          userId,
          activityDate: yesterday,
        },
      },
    });

    // If yesterday had a streak, increment by 1. Otherwise reset to 1.
    const newStreakCount = yesterdayStreak ? yesterdayStreak.streakCount + 1 : 1;

    const streakRecord = await prisma.dailyStreak.create({
      data: {
        userId,
        activityDate: today,
        streakCount: newStreakCount,
        lessonsCompleted: 1,
      },
    });

    return streakRecord;
  },

  /**
   * Get user's current streak, longest streak, and total active learning days
   */
  async getUserStreakStats(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Latest streak record
    const latestStreak = await prisma.dailyStreak.findFirst({
      where: { userId },
      orderBy: { activityDate: "desc" },
    });

    let currentStreak = 0;
    if (latestStreak) {
      const latestDate = new Date(latestStreak.activityDate);
      latestDate.setHours(0, 0, 0, 0);

      // Active if logged today or yesterday
      if (latestDate.getTime() === today.getTime() || latestDate.getTime() === yesterday.getTime()) {
        currentStreak = latestStreak.streakCount;
      }
    }

    // Longest streak
    const maxRecord = await prisma.dailyStreak.findFirst({
      where: { userId },
      orderBy: { streakCount: "desc" },
    });

    const totalActiveDays = await prisma.dailyStreak.count({
      where: { userId },
    });

    return {
      currentStreak,
      longestStreak: maxRecord?.streakCount || currentStreak,
      totalActiveDays,
      lastActiveDate: latestStreak?.activityDate || null,
    };
  },
};

