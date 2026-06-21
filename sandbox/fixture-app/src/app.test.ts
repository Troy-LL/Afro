import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { verifyToken } from "./auth.ts";
import { greetAuthorized } from "./index.ts";

describe("verifyToken", () => {
  it("rejects empty and non-string tokens", () => {
    assert.equal(verifyToken(""), false);
    assert.equal(verifyToken(null), false);
  });

  it("rejects garbage tokens that look long but are not signed", () => {
    assert.equal(verifyToken("totally-not-valid-token"), false);
  });
});

describe("greetAuthorized", () => {
  it("throws when token fails verification", () => {
    assert.throws(() => greetAuthorized("troy", "bad"), /unauthorized/);
  });
});
