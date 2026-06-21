import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { validateEmail } from "./email.js";

export type RowRecord = Record<string, unknown>;

export type InvalidRow = {
  index: number;
  row: RowRecord;
  reason: string;
};

const MAX_FILE_BYTES = 5 * 1024 * 1024;

export type LoadResult =
  | { ok: true; rows: RowRecord[] }
  | { ok: false; reason: string };

/** Parse and structurally validate JSON rows from an untrusted file path. */
export async function loadRowsFromFile(filePath: string): Promise<LoadResult> {
  const absolutePath = resolve(filePath);

  let raw: string;
  try {
    const buffer = await readFile(absolutePath);
    if (buffer.byteLength > MAX_FILE_BYTES) {
      return { ok: false, reason: `file exceeds ${MAX_FILE_BYTES} bytes` };
    }
    raw = buffer.toString("utf8");
  } catch {
    return { ok: false, reason: `cannot read file: ${absolutePath}` };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "file is not valid JSON" };
  }

  if (!Array.isArray(parsed)) {
    return { ok: false, reason: "root JSON value must be an array of row objects" };
  }

  const rows: RowRecord[] = [];
  for (let i = 0; i < parsed.length; i++) {
    const item = parsed[i];
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      return {
        ok: false,
        reason: `row at index ${i} must be a plain object`,
      };
    }
    rows.push(item as RowRecord);
  }

  return { ok: true, rows };
}

/** Return rows whose email field fails boundary validation. */
export function findInvalidRows(rows: RowRecord[]): InvalidRow[] {
  const invalid: InvalidRow[] = [];

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    if (!Object.prototype.hasOwnProperty.call(row, "email")) {
      invalid.push({ index, row, reason: "missing email field" });
      continue;
    }

    const result = validateEmail(row.email);
    if (!result.ok) {
      invalid.push({ index, row, reason: result.reason });
    }
  }

  return invalid;
}
