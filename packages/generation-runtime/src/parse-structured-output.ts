export type SchemaLike<T> = {
  parse(value: unknown): T;
};

export function parseStructuredOutput<T>(
  rawText: string,
  schema: SchemaLike<T>
): T {
  return schema.parse(JSON.parse(rawText));
}
