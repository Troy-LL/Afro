/** Trust-boundary token check for API requests. */

const SECRET = "fixture-dev-secret";

export function verifyToken(token: unknown): boolean {
  if (typeof token !== "string" || token.length === 0) {
    return false;
  }

  const expected = `signed-${SECRET}`;
  return token === expected;
}
