import { CourseStudioPreview } from "../../components/admin/course-studio-preview";
import { LessonMapPreview } from "../../components/learner/lesson-map-preview";
import { PageShell } from "../../components/shared/page-shell";

export default function MarketingPage() {
  return (
    <PageShell
      eyebrow="Monorepo Scaffold"
      title="Langue starts with clean seams."
      description="This scaffold keeps the learner app, the operator CMS, and the generation worker independently replaceable."
    >
      <div className="page-grid">
        <LessonMapPreview />
        <CourseStudioPreview />
      </div>
    </PageShell>
  );
}
