import { PageShell } from "../../../components/shared/page-shell";

export default function PlacementPage() {
  return (
    <PageShell
      eyebrow="Learner"
      title="Placement"
      description="Placement will stay isolated from lesson runtime so assessment logic can evolve independently."
    >
      <div className="surface-card">
        <p>Reserved for the placement entry flow and score summary.</p>
      </div>
    </PageShell>
  );
}
