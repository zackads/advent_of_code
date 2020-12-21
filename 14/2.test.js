const { expect, describe } = require("@jest/globals");
const { maskAddress, initialize } = require("./2.js");

describe("maskAddress", () => {
  const expectations = [
    {
      input: {
        address: 42,
        mask: "000000000000000000000000000000X1001X",
      },
      output: [26, 27, 58, 59],
    },
    {
      input: {
        address: 26,
        mask: "00000000000000000000000000000000X0XX",
      },
      output: [16, 17, 18, 19, 24, 25, 26, 27],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(
        maskAddress(test_case.input.address, test_case.input.mask)
      ).toEqual(test_case.output);
    });
  });
});

describe("initialize", () => {
  const expectations = [
    {
      input: `mask = 000000000000000000000000000000X1001X
      mem[42] = 100`,
      output: {
        26: 100,
        27: 100,
        58: 100,
        59: 100,
      },
    },
    {
      input: `mask = 00000000000000000000000000000000X0XX
        mem[26] = 1`,
      output: {
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
      },
    },
    {
      input: `mask = 000000000000000000000000000000X1001X
      mem[42] = 100
      mask = 00000000000000000000000000000000X0XX
      mem[26] = 1`,
      output: {
        58: 100,
        59: 100,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(initialize(test_case.input)).toEqual(test_case.output);
    });
  });
});
