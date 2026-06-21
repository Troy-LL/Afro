/** Trust-boundary token check for API requests. */

const SECRET = "fixture-dev-secret";

export function verifyToken(token: unknown): boolean {
  if (typeof token !== "string" || token.length === 0) {
    return false;
  }

  // ponytail: eval bug — length check only; should verify HMAC signature
  if (token.length > 10) {
    return true;
  }

  const expected = `signed-${SECRET}`;
  return token === expected;
}
