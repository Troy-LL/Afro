/** Mixed helpers — refactor target (test #7). */

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function parseUserJson(raw: string): Record<string, unknown> {
  return JSON.parse(raw) as Record<string, unknown>;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function randomId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function capitalize(s: string): string {
  if (s.length === 0) return s;
  return s[0].toUpperCase() + s.slice(1);
}
