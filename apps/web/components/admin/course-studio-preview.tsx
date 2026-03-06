import { defaultCourseBrief } from "@langue/schemas";

export function CourseStudioPreview() {
  return (
    <section className="surface-card">
      <h2>Operator Surface</h2>
      <p>Natural language brief first, implementation details hidden.</p>
      <div className="key-value-grid">
        <span>Source</span>
        <strong>{defaultCourseBrief.sourceLanguage}</strong>
        <span>Target</span>
        <strong>{defaultCourseBrief.targetLanguage}</strong>
        <span>Level</span>
        <strong>{defaultCourseBrief.targetLevel}</strong>
        <span>Goal</span>
        <strong>{defaultCourseBrief.courseGoal}</strong>
      </div>
    </section>
  );
}
