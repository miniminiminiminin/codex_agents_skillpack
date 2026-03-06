import { defaultCourseBrief } from "@langue/schemas";

export async function runGenerateCourseJob() {
  return {
    job: "generate-course",
    payload: defaultCourseBrief
  };
}
