const { expect, describe } = require("@jest/globals");
const { decodeTicket, calculatePositions } = require("./2.js");

// Didn't actually need this test
describe.skip("decodeTicket", () => {
  const expectations = [
    {
      input: `class: 0-1 or 4-19
      row: 0-5 or 8-19
      seat: 0-13 or 16-19
      
      your ticket:
      11,12,13
      
      nearby tickets:
      3,9,18
      15,1,5
      5,14,9`,
      output: {
        class: 12,
        row: 11,
        seat: 13,
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.input.slice(0, 15)}... => ${test_case.output}`, () => {
      expect(decodeTicket(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("calculatePositions", () => {
  const expectations = [
    {
      input: { class: [1, 2], row: [0, 1, 2], seat: [2] },
      output: {
        class: 1,
        row: 0,
        seat: 2,
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)}... => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(calculatePositions(test_case.input)).toEqual(test_case.output);
    });
  });
});
