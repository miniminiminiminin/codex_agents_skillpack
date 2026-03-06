import { createMockCourseOutline } from "@langue/content";

export function LessonMapPreview() {
  const course = createMockCourseOutline();

  return (
    <section className="surface-card">
      <h2>Learner Surface</h2>
      <p>{course.title}</p>
      <div className="path-preview">
        {course.units.map((unit) => (
          <div key={unit.id} className="path-node">
            <strong>{unit.title}</strong>
            <span>{unit.lessonCount} lessons</span>
          </div>
        ))}
      </div>
    </section>
  );
}
