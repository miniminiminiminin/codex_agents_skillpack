export const promptFragmentSlots = [
  "role",
  "task",
  "constraints",
  "reasoning-policy",
  "context",
  "example",
  "output-format",
] as const;

export type PromptFragmentSlot = (typeof promptFragmentSlots)[number];

export type PromptFragment = {
  id: string;
  slot: PromptFragmentSlot;
  order: number;
  content: string;
};
