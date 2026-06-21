import { verifyToken } from "./auth.ts";
import { capitalize, formatDate } from "./utils.ts";

export function greetAuthorized(name: string, token: unknown): string {
  if (!verifyToken(token)) {
    throw new Error("unauthorized");
  }
  return `Hello, ${capitalize(name)} — ${formatDate(new Date())}`;
}
