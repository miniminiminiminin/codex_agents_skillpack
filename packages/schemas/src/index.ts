import { z } from "zod";

export const courseBriefSchema = z.object({
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  targetLevel: z.string(),
  courseGoal: z.string(),
  tone: z.string(),
  lessonVolume: z.string(),
  seedMaterial: z.string().optional()
});

export type CourseBrief = z.infer<typeof courseBriefSchema>;

export const defaultCourseBrief: CourseBrief = {
  sourceLanguage: "Korean",
  targetLanguage: "French",
  targetLevel: "A1-A2",
  courseGoal: "Travel conversations with short daily sessions",
  tone: "Warm, guided, Duolingo-like",
  lessonVolume: "30 lessons"
};
