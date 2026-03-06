import { createMockLearnerSnapshot } from "@langue/learning";
import { PageShell } from "../../../components/shared/page-shell";

export default function ReviewPage() {
  const snapshot = createMockLearnerSnapshot();

  return (
    <PageShell
      eyebrow="Learner"
      title="Review Queue"
      description="Review remains a separate route so the scheduling engine can be swapped without touching the app shell."
    >
      <div className="surface-card">
        <strong>{snapshot.reviewDueCount} items due</strong>
        <p>Current streak: {snapshot.streakDays} days</p>
      </div>
    </PageShell>
  );
}
