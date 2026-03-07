export async function runPublishCourseJob() {
  return {
    job: "publish-course" as const,
    status: "ready" as const,
  };
}
