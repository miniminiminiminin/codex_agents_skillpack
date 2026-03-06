import { generationQueueNames } from "@langue/jobs";
import { PageShell } from "../../../components/shared/page-shell";

export default function AdminGenerationJobsPage() {
  return (
    <PageShell
      eyebrow="Operator CMS"
      title="Generation Jobs"
      description="Queue names live in a dedicated package so worker orchestration can change without rewriting admin UI."
    >
      <ul className="stack-list">
        {generationQueueNames.map((queueName) => (
          <li key={queueName} className="surface-card">
            {queueName}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
