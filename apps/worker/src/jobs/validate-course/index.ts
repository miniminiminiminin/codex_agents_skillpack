export async function runValidateCourseJob() {
  return {
    job: "validate-course" as const,
    checks: 6,
  };
}
