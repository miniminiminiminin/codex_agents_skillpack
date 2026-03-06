export const authRoles = ["admin", "learner"] as const;

export type AuthRole = (typeof authRoles)[number];
