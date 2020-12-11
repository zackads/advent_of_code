const { expect, describe } = require("@jest/globals");
const {
  countGroup,
  duplicates,
  histogram,
  homogenous,
  commonProperties,
  common,
} = require("./2");

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

describe("duplicates", () => {
  const expectations = [
    { input: { a: 1, b: 1, c: 1 }, output: [] },
    { input: { a: 2, c: 1 }, output: ["a"] },
    { input: { c: 3 }, output: ["c"] },
  ];

  expectations.forEach((test_case) => {
    test(`input ${JSON.stringify(test_case.input)} returns [${
      test_case.output
    }] `, () => {
      expect(duplicates(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("homogenous", () => {
  const expectations = [
    { input: [], output: true },
    { input: ["a", "a"], output: true },
    { input: ["ab", "ab"], output: true },
  ];

  expectations.forEach((test_case) => {
    test(`input ${JSON.stringify(test_case.input)} returns [${
      test_case.output
    }] `, () => {
      expect(homogenous(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("commonProperties", () => {
  const expectations = [
    {
      input: [
        { a: 1, b: 1 },
        { a: 2, b: 3 },
      ],
      output: ["a", "b"],
    },
    {
      input: [
        { a: 1, b: 1 },
        { a: 2, c: 3 },
      ],
      output: ["a"],
    },
  ];

  expectations.forEach((test_case) => {
    test(`input ${JSON.stringify(test_case.input)} returns [${
      test_case.output
    }] `, () => {
      expect(commonProperties(...test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("common", () => {
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
      expect(common(...test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("countGroup", () => {
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
      expect(countGroup(test_case.input)).toEqual(test_case.output);
    });
  });
});
