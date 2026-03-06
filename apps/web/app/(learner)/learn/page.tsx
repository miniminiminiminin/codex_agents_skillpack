import { createMockCourseOutline } from "@langue/content";
import { PageShell } from "../../../components/shared/page-shell";

export default function LearnPage() {
  const course = createMockCourseOutline();

  return (
    <PageShell
      eyebrow="Learner"
      title="Path Learning"
      description="This route will host the Gemini-designed learner shell later."
    >
      <ul className="stack-list">
        {course.units.map((unit) => (
          <li key={unit.id} className="surface-card">
            <strong>{unit.title}</strong>
            <span>{unit.lessonCount} lessons</span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
