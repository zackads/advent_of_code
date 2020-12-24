const { expect, describe } = require("@jest/globals");
const { parse, pad, sumActiveCubesAfter6Cycles } = require("./1.js");

describe.skip("Acceptance Test: sumActiveCubesAfterNCycles()", () => {
  const expectations = [
    {
      input: ".#.\n..#\n###",
      output: 112,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${test_case.output}`, () => {
      expect(sumActiveCubesAfter6Cycles(test_case.input.start_state)).toEqual(
        test_case.output
      );
    });
  });
});
