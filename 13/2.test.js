const { expect, describe } = require("@jest/globals");
const { earliestTimestamp, aligns, lcm, lcm_two_numbers } = require("./2.js");

describe("aligns", () => {
  const expectations = [
    {
      input: [77, [7, 13]],
      output: true,
    },
    {
      input: [10, [7, 13]],
      output: false,
    },
    {
      input: [350, [7, 13, 1, 1, 59]],
      output: true,
    },
    {
      input: [70147, [7, 13, 1, 1, 59, 1, 31]],
      output: true,
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${JSON.stringify(test_case.input)}] => ${test_case.output}`, () => {
      expect(aligns(...test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("lcm", () => {
  const expectations = [
    {
      input: [7, 13],
      output: 91,
    },
    {
      input: [7, 13, 1],
      output: 91,
    },
    {
      input: [7, 13, 42],
      output: 546,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${test_case.output}`, () => {
      expect(lcm(...test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("earliestTimestamp", () => {
  const expectations = [
    {
      input: [7, 13, 1, 1, 59, 1, 31, 19],
      output: 1068781,
    },
    {
      input: [17, 1, 13, 19],
      output: 3417,
    },
    {
      input: [67, 7, 59, 61],
      output: 754018,
    },
    {
      input: [67, 1, 7, 59, 61],
      output: 779210,
    },
    {
      input: [67, 7, 1, 59, 61],
      output: 1261476,
    },
    {
      input: [1789, 37, 47, 1889],
      output: 1202161486,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${test_case.output}`, () => {
      expect(earliestTimestamp(test_case.input)).toEqual(test_case.output);
    });
  });
});
