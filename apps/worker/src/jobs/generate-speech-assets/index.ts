import { speakingProviderLabel } from "@langue/ai";

export async function runGenerateSpeechAssetsJob() {
  return {
    job: "generate-speech-assets" as const,
    provider: speakingProviderLabel,
  };
}
