#!/usr/bin/env node
import { findInvalidRows, loadRowsFromFile } from "./validate-rows.js";

function printUsage(): void {
  console.error("Usage: validate-emails <path-to-json>");
  console.error("");
  console.error("JSON file must be an array of objects with an email field.");
}

async function main(): Promise<number> {
  const filePath = process.argv[2];

  if (!filePath || filePath === "--help" || filePath === "-h") {
    printUsage();
    return filePath ? 0 : 1;
  }

  const loaded = await loadRowsFromFile(filePath);
  if (!loaded.ok) {
    console.error(`Error: ${loaded.reason}`);
    return 1;
  }

  const invalid = findInvalidRows(loaded.rows);

  if (invalid.length === 0) {
    console.log("All rows valid.");
    return 0;
  }

  for (const entry of invalid) {
    console.log(
      JSON.stringify({
        index: entry.index,
        reason: entry.reason,
        row: entry.row,
      }),
    );
  }

  return 1;
}

main().then((code) => {
  process.exitCode = code;
});
