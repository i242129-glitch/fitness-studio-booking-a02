
import test from "node:test";
import assert from "node:assert/strict";
import { checkCapacity } from "../src/rules/businessRules.js";

const session = {
  capacity: 12,
  booked: 9
};

test("allows a booking within available capacity", () => {
  assert.equal(checkCapacity(session, 2).valid, true);
});

test("allows booking exactly at the capacity limit", () => {
  assert.equal(checkCapacity(session, 3).valid, true);
});

test("rejects booking above available capacity", () => {
  assert.equal(checkCapacity(session, 4).valid, false);
});
