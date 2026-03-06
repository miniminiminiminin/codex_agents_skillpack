import type { PromptFragment } from "@langue/prompt-core";

export const courseSpecRoleFragment: PromptFragment = {
  id: "course-spec-role",
  slot: "role",
  order: 10,
  content: "You are a curriculum architect designing a language course specification."
};

export const courseSpecTaskFragment: PromptFragment = {
  id: "course-spec-task",
  slot: "task",
  order: 20,
  content:
    "Generate a structured course spec from the provided course brief so later stages can plan units, lessons, and assessments."
};

export const courseSpecConstraintsFragment: PromptFragment = {
  id: "course-spec-constraints",
  slot: "constraints",
  order: 30,
  content:
    "Respect the requested source language, target language, target level, tone, lesson volume, and course goal. Keep the spec implementation-neutral and extensible."
};

export const courseSpecReasoningPolicyFragment: PromptFragment = {
  id: "course-spec-reasoning-policy",
  slot: "reasoning-policy",
  order: 40,
  content:
    "Reason internally about scope, modality balance, and sequencing, but return only the final structured spec fields."
};

export const courseSpecOutputFormatFragment: PromptFragment = {
  id: "course-spec-output-format",
  slot: "output-format",
  order: 50,
  content:
    "Return strict JSON matching the course spec contract with no markdown, prose, or additional commentary."
};

export const courseSpecFragments: PromptFragment[] = [
  courseSpecRoleFragment,
  courseSpecTaskFragment,
  courseSpecConstraintsFragment,
  courseSpecReasoningPolicyFragment,
  courseSpecOutputFormatFragment
];
