import { courseBriefSchema } from "@langue/schemas";
import { CourseStudioPreview } from "../../../components/admin/course-studio-preview";
import { PageShell } from "../../../components/shared/page-shell";

export default function AdminCoursesPage() {
  const fields = Object.keys(courseBriefSchema.shape);

  return (
    <PageShell
      eyebrow="Operator CMS"
      title="Course Studio"
      description="The CMS remains a thin shell over contracts defined in shared packages."
    >
      <CourseStudioPreview />
      <div className="surface-card">
        <strong>Course brief contract</strong>
        <ul className="stack-list compact">
          {fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
