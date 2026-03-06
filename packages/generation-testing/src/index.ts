export type GenerationSmokePackageId =
  | "@langue/content-models"
  | "@langue/generation-contracts"
  | "@langue/generation-registry"
  | "@langue/generation-runtime"
  | "@langue/prompt-catalog"
  | "@langue/prompt-core";

export type GenerationSmokeStatus = "pending" | "ready";

export type GenerationSmokeEntry = {
  packageId: GenerationSmokePackageId;
  publicEntrypoint: "src/index.ts";
  status: GenerationSmokeStatus;
};

const generationSmokePackageIds: readonly GenerationSmokePackageId[] = [
  "@langue/content-models",
  "@langue/generation-contracts",
  "@langue/generation-registry",
  "@langue/generation-runtime",
  "@langue/prompt-catalog",
  "@langue/prompt-core"
];

export function createGenerationSmokeSetup(
  status: GenerationSmokeStatus = "pending"
): GenerationSmokeEntry[] {
  return generationSmokePackageIds.map((packageId) => ({
    packageId,
    publicEntrypoint: "src/index.ts",
    status
  }));
}

export const defaultGenerationSmokeSetup = createGenerationSmokeSetup();
