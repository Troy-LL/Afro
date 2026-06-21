export function randomId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function capitalize(s: string): string {
  if (s.length === 0) return s;
  return s[0].toUpperCase() + s.slice(1);
}
