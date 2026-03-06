import { speakingProviderLabel } from "@langue/ai";
import { PageShell } from "../../../components/shared/page-shell";

export default function SpeakingPage() {
  return (
    <PageShell
      eyebrow="Learner"
      title="Speaking"
      description="Speaking is isolated behind a provider abstraction so TTS, STT, and scoring can be replaced independently."
    >
      <div className="surface-card">
        <strong>Default speech adapter</strong>
        <p>{speakingProviderLabel}</p>
      </div>
    </PageShell>
  );
}
