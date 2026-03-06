export type LearnerSnapshot = {
  streakDays: number;
  reviewDueCount: number;
  xp: number;
};

export function createMockLearnerSnapshot(): LearnerSnapshot {
  return {
    streakDays: 8,
    reviewDueCount: 14,
    xp: 1280
  };
}
