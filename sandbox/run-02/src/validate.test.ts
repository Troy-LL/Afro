import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateEmail } from "./email.js";
import { findInvalidRows } from "./validate-rows.js";

describe("validateEmail", () => {
  it("accepts a well-formed address and rejects common bad inputs", () => {
    const good = validateEmail("alice@example.com");
    assert.equal(good.ok, true);
    if (good.ok) {
      assert.equal(good.email, "alice@example.com");
    }

    const cases: Array<[unknown, string]> = [
      [null, "email must be a string"],
      [42, "email must be a string"],
      ["", "email must not be empty"],
      ["not-an-email", "email must contain a single @ separating local and domain"],
      ["bad@domain", "domain is not a valid hostname"],
      [" spaces@example.com ", "email must not have leading or trailing whitespace"],
      ["a@b.c\n", "email contains control characters"],
      ["user@@example.com", "email must contain exactly one @"],
    ];

    for (const [input, reason] of cases) {
      const result = validateEmail(input);
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.reason, reason);
      }
    }
  });
});

describe("findInvalidRows", () => {
  it("flags rows with missing or invalid email fields", () => {
    const rows = [
      { id: 1, email: "ok@example.com" },
      { id: 2, email: "nope" },
      { id: 3 },
    ];

    const invalid = findInvalidRows(rows);
    assert.equal(invalid.length, 2);
    assert.deepEqual(
      invalid.map((r) => r.index),
      [1, 2],
    );
    assert.equal(invalid[0].reason, "email must contain a single @ separating local and domain");
    assert.equal(invalid[1].reason, "missing email field");
  });
});
