const { expect, describe } = require("@jest/globals");
const { countYesAnswers, histogram, commonChars } = require("./2");

describe("histogram", () => {
  const expectations = [
    { input: ["a", "b", "c"], output: { a: 1, b: 1, c: 1 } },
    { input: ["a", "a", "c"], output: { a: 2, c: 1 } },
    { input: ["c", "c", "c"], output: { c: 3 } },
  ];

  expectations.forEach((test_case) => {
    test(`input [${test_case.input}] returns ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(histogram(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("commonChars", () => {
  const expectations = [
    { input: ["a", "a"], output: ["a"] },
    { input: ["ab", "ab"], output: ["a", "b"] },
    { input: ["ab", "ab", "ac"], output: ["a"] },
    { input: ["ab", "ab", "cd"], output: [] },
  ];

  expectations.forEach((test_case) => {
    test(`input ${JSON.stringify(test_case.input)} returns [${
      test_case.output
    }] `, () => {
      expect(commonChars(...test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("countYesAnswers", () => {
  const expectations = [
    { input: "", output: 0 },
    { input: "a", output: 1 },
    { input: "b", output: 1 },
    { input: "ab", output: 2 },
    { input: "abc", output: 3 },
    { input: "a\nb", output: 0 },
    { input: "a\na", output: 1 },
    { input: "a\na\na", output: 1 },
    { input: "a\na\nb", output: 0 },
    { input: "a\nb\nc", output: 0 },
    { input: "ab\nab", output: 2 },
    { input: "abc\nabc", output: 3 },
    { input: "ab\nac", output: 1 },
    { input: "ab\nac\ncd", output: 0 },
  ];

  expectations.forEach((test_case) => {
    test(`input ${JSON.stringify(test_case.input)} returns [${
      test_case.output
    }] `, () => {
      expect(countYesAnswers(test_case.input)).toEqual(test_case.output);
    });
  });
});
