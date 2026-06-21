export function parseUserJson(raw: string): Record<string, unknown> {
  return JSON.parse(raw) as Record<string, unknown>;
}
