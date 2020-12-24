const { expect, describe } = require("@jest/globals");
const { evaluate } = require("./2.js");

describe("evaluate()", () => {
  const expectations = [
    {
      expression: "1 + 2 * 3 + 4 * 5 + 6",
      result: 231,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.expression} => ${test_case.result}`, () => {
      expect(evaluate(test_case.expression)).toEqual(test_case.result);
    });
  });
});
