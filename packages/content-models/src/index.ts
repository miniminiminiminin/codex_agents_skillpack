import { z } from "zod";

export const courseModelsSmoke = "content-models";

export const modalityMixSchema = z.object({
  reading: z.number().min(0).max(1),
  listening: z.number().min(0).max(1),
  speaking: z.number().min(0).max(1),
  writing: z.number().min(0).max(1)
});

export const courseSpecSchema = z.object({
  courseId: z.string(),
  title: z.string(),
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  targetLevel: z.string(),
  audience: z.string(),
  courseGoal: z.string(),
  tone: z.string(),
  lessonVolume: z.string(),
  unitCount: z.number().int().positive(),
  unitThemes: z.array(z.string()).min(1),
  modalityMix: modalityMixSchema,
  assessmentStyle: z.string(),
  publishPolicy: z.string(),
  notesForNextStage: z.array(z.string())
});

export type CourseSpec = z.infer<typeof courseSpecSchema>;
