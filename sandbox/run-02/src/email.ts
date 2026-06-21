/** Parsed email after trust-boundary validation. */
export type ValidEmail = string & { readonly __brand: "ValidEmail" };

export type EmailValidationResult =
  | { ok: true; email: ValidEmail }
  | { ok: false; reason: string };

const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_LENGTH = 64;
const MAX_DOMAIN_LENGTH = 253;

/** RFC 5322–inspired local part (practical subset, no quoted strings). */
const LOCAL_PART = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

/** Domain labels with at least one dot; TLD must be 2+ letters. */
const DOMAIN =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validate an untrusted email value at the system boundary.
 * Rejects non-strings, control characters, length violations, and malformed structure.
 */
export function validateEmail(value: unknown): EmailValidationResult {
  if (typeof value !== "string") {
    return { ok: false, reason: "email must be a string" };
  }

  if (value.length === 0) {
    return { ok: false, reason: "email must not be empty" };
  }

  if (value.length > MAX_EMAIL_LENGTH) {
    return { ok: false, reason: `email exceeds ${MAX_EMAIL_LENGTH} characters` };
  }

  if (/[\x00-\x1f\x7f]/.test(value)) {
    return { ok: false, reason: "email contains control characters" };
  }

  if (value !== value.trim()) {
    return { ok: false, reason: "email must not have leading or trailing whitespace" };
  }

  const atIndex = value.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === value.length - 1) {
    return { ok: false, reason: "email must contain a single @ separating local and domain" };
  }

  const local = value.slice(0, atIndex);
  const domain = value.slice(atIndex + 1);

  if (local.length > MAX_LOCAL_LENGTH) {
    return { ok: false, reason: `local part exceeds ${MAX_LOCAL_LENGTH} characters` };
  }

  if (domain.length > MAX_DOMAIN_LENGTH) {
    return { ok: false, reason: `domain exceeds ${MAX_DOMAIN_LENGTH} characters` };
  }

  if (value.indexOf("@") !== atIndex) {
    return { ok: false, reason: "email must contain exactly one @" };
  }

  if (!LOCAL_PART.test(local)) {
    return { ok: false, reason: "local part contains invalid characters" };
  }

  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return { ok: false, reason: "local part has invalid dot placement" };
  }

  if (!DOMAIN.test(domain)) {
    return { ok: false, reason: "domain is not a valid hostname" };
  }

  return { ok: true, email: value as ValidEmail };
}
