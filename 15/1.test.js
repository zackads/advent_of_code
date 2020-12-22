const { expect, describe } = require("@jest/globals");
const { nthNumber } = require("./1.js");

describe("nthNumber", () => {
  const expectations = [
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 4,
      },
      output: 0,
    },
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 5,
      },
      output: 3,
    },
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 6,
      },
      output: 3,
    },
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 7,
      },
      output: 1,
    },
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 8,
      },
      output: 0,
    },
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 9,
      },
      output: 4,
    },
    {
      input: {
        starting_numbers: [0, 3, 6],
        n: 10,
      },
      output: 0,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${test_case.output}`, () => {
      expect(
        nthNumber(test_case.input.starting_numbers, test_case.input.n)
      ).toEqual(test_case.output);
    });
  });
});
