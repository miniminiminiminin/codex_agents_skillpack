import { PageShell } from "../../../components/shared/page-shell";

const checks = [
  "Schema validation",
  "Pedagogical validation",
  "Linguistic validation",
  "Assessment validation",
  "Safety validation",
  "Simulation validation"
];

export default function AdminValidationPage() {
  return (
    <PageShell
      eyebrow="Operator CMS"
      title="Validation"
      description="Validation is modeled as a first-class pipeline instead of an afterthought."
    >
      <ul className="stack-list">
        {checks.map((check) => (
          <li key={check} className="surface-card">
            {check}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
