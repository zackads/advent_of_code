const { expect, describe } = require("@jest/globals");
const { countGroup, duplicates, histogram } = require("./2");

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

describe("countGroup", () => {
  test("counts 'abc' as 3", () => {
    expect(countGroup("abc")).toEqual(3);
  });

  test("counts 'a\\nb\\nc' as 0", () => {
    expect(countGroup("a\nb\nc")).toEqual(0);
  });

  test.skip("counts 'ab\\nac' as 1", () => {
    expect(countGroup("ab\nac")).toEqual(1);
  });
});
