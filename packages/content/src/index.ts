export type CourseUnitPreview = {
  id: string;
  title: string;
  lessonCount: number;
};

export type CourseOutline = {
  id: string;
  title: string;
  units: CourseUnitPreview[];
};

export function createMockCourseOutline(): CourseOutline {
  return {
    id: "course_fr_travel",
    title: "French Travel Sprint",
    units: [
      { id: "unit_1", title: "Meet and Greet", lessonCount: 6 },
      { id: "unit_2", title: "Ordering and Asking", lessonCount: 7 },
      { id: "unit_3", title: "Getting Around", lessonCount: 8 }
    ]
  };
}
