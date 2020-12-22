const { expect, describe } = require("@jest/globals");
const { errorRate, parse, invalidValues } = require("./1.js");

describe("errorRate", () => {
  const expectations = [
    {
      input: `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`,
      output: 71,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.input.slice(0, 15)}... => ${test_case.output}`, () => {
      expect(errorRate(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("parse", () => {
  const expectations = [
    {
      input: `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`,
      output: {
        rules: [
          {
            category: "class",
            range1: [1, 3],
            range2: [5, 7],
          },
          {
            category: "row",
            range1: [6, 11],
            range2: [33, 44],
          },
          {
            category: "seat",
            range1: [13, 40],
            range2: [45, 50],
          },
        ],
        nearby_tickets: [
          [7, 3, 47],
          [40, 4, 50],
          [55, 2, 20],
          [38, 6, 12],
        ],
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.input.slice(0, 15)} => ${test_case.output}`, () => {
      expect(parse(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("invalidValues", () => {
  const expectations = [
    {
      input: {
        ticket: [7],
        rules: [{ range1: [1, 3], range2: [3, 4] }],
      },
      output: [7],
    },
    {
      input: {
        ticket: [3],
        rules: [{ range1: [1, 3], range2: [3, 4] }],
      },
      output: [],
    },
    {
      input: {
        ticket: [7, 3, 47],
        rules: [
          {
            category: "class",
            range1: [1, 3],
            range2: [5, 7],
          },
          {
            category: "row",
            range1: [6, 11],
            range2: [33, 44],
          },
          {
            category: "seat",
            range1: [13, 40],
            range2: [45, 50],
          },
        ],
      },
      output: [],
    },
    {
      input: {
        ticket: [40, 4, 50],
        rules: [
          {
            category: "class",
            range1: [1, 3],
            range2: [5, 7],
          },
          {
            category: "row",
            range1: [6, 11],
            range2: [33, 44],
          },
          {
            category: "seat",
            range1: [13, 40],
            range2: [45, 50],
          },
        ],
      },
      output: [4],
    },
    {
      input: {
        ticket: [55, 2, 20],
        rules: [
          {
            category: "class",
            range1: [1, 3],
            range2: [5, 7],
          },
          {
            category: "row",
            range1: [6, 11],
            range2: [33, 44],
          },
          {
            category: "seat",
            range1: [13, 40],
            range2: [45, 50],
          },
        ],
      },
      output: [55],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.input.ticket} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(
        invalidValues(test_case.input.ticket, test_case.input.rules)
      ).toEqual(test_case.output);
    });
  });
});
