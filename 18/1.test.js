const { expect, describe } = require("@jest/globals");
const {
  evaluate,
  infix2postfix,
  string2infix,
  evaluatePostfix,
} = require("./1.js");

describe("infix2postfix()", () => {
  const expectations = [
    {
      infix: [1, "+", 1],
      postfix: [1, 1, "+"],
    },
    {
      infix: [2, "+", 1],
      postfix: [2, 1, "+"],
    },
    {
      infix: [1, "+", 2, "+", 3],
      postfix: [1, 2, "+", 3, "+"],
    },
    {
      infix: [1, "+", 2, "*", 3],
      postfix: [1, 2, "+", 3, "*"],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.infix} => ${test_case.postfix}`, () => {
      expect(infix2postfix(test_case.infix)).toEqual(test_case.postfix);
    });
  });
});

describe("string2infix()", () => {
  const expectations = [
    {
      string: "1 + 1",
      infix: [1, "+", 1],
    },
    {
      string: "1 + 2",
      infix: [1, "+", 2],
    },
    {
      string: "1 + 2 + 3",
      infix: [1, "+", 2, "+", 3],
    },
    {
      string: "1 + (2 + 3)",
      infix: [1, "+", "(", 2, "+", 3, ")"],
    },
    {
      string: "1 + ((2 + 3))",
      infix: [1, "+", "(", "(", 2, "+", 3, ")", ")"],
    },
    {
      string: "(1 + (2 + 3))",
      infix: ["(", 1, "+", "(", 2, "+", 3, ")", ")"],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.string} => ${JSON.stringify(test_case.infix)}`, () => {
      expect(string2infix(test_case.string)).toEqual(test_case.infix);
    });
  });
});

describe("evaluatePostfix()", () => {
  const expectations = [
    {
      postfix: [1, 1, "+"],
      evaluation: 2,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.postfix)} => ${
      test_case.evaluation
    }`, () => {
      expect(evaluatePostfix(test_case.postfix)).toEqual(test_case.evaluation);
    });
  });
});

describe("evaluate()", () => {
  const expectations = [
    {
      expression: "1 + 1",
      result: 2,
    },
    {
      expression: "3 * 3",
      result: 9,
    },
    {
      expression: "4 * 6",
      result: 24,
    },
    {
      expression: "3 + 3 + 3",
      result: 9,
    },
    {
      expression: "3 + 3 + 3 + 7",
      result: 16,
    },
    {
      expression: "2 * 4 * 6",
      result: 48,
    },
    {
      expression: "2 * 4 + 6",
      result: 14,
    },
    {
      expression: "2 + 4 * 6",
      result: 36,
    },
    {
      expression: "1 + 2 * 3 + 4 * 5 + 6",
      result: 71,
    },
    {
      expression: "2 + (4 * 6)",
      result: 26,
    },
    {
      expression: "1 + (2 * 3)",
      result: 7,
    },
    {
      expression: "1 + (2 + 3)",
      result: 6,
    },
    {
      expression: "1 + (2 + (1 + 2))",
      result: 6,
    },
    {
      expression: "1 + (2 + (1 * 2))",
      result: 5,
    },
    {
      expression: "1 + (2 * (1 * 2))",
      result: 5,
    },
    {
      expression: "1 + (2 * (1 + 2))",
      result: 7,
    },
    {
      expression: "1 + (2 * 3) + (4 * (5 + 6))",
      result: 51,
    },
    {
      expression: "2 * 3 + (4 * 5)",
      result: 26,
    },
    {
      expression: "2 * 3 + (4 * 5)",
      result: 26,
    },
    {
      expression: "5 + (8 * 3 + 9 + 3 * 4 * 3)",
      result: 437,
    },
    {
      expression: "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))",
      result: 12240,
    },
    {
      expression: "(1 + 2)",
      result: 3,
    },
    {
      expression: "((2 + 4 * 9) * 2)",
      result: 108,
    },
    {
      expression: "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
      result: 13632,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.expression} => ${test_case.result}`, () => {
      expect(evaluate(test_case.expression)).toEqual(test_case.result);
    });
  });
});
