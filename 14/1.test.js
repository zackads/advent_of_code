const { expect, describe } = require("@jest/globals");
const { applyMask, dec2bin, initialize, parse } = require("./1.js");

describe("dec2bin", () => {
  const expectations = [
    {
      input: 1,
      output: "000000000000000000000000000000000001",
    },
    {
      input: 2,
      output: "000000000000000000000000000000000010",
    },
    {
      input: 11,
      output: "000000000000000000000000000000001011",
    },
    {
      input: 73,
      output: "000000000000000000000000000001001001",
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(dec2bin(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("mask", () => {
  const expectations = [
    {
      input: {
        mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
        value: 11,
      },
      output: 73,
    },
    {
      input: {
        mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
        value: 101,
      },
      output: 101,
    },
    {
      input: {
        mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
        value: 0,
      },
      output: 64,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(applyMask(test_case.input.mask, test_case.input.value)).toEqual(
        test_case.output
      );
    });
  });
});

describe("parse", () => {
  const expectations = [
    {
      input: `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X`,
      output: [["mask", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"]],
    },
    {
      input: `mem[8] = 11`,
      output: [["mem", "8", 11]],
    },
    {
      input: `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
                mem[8] = 11`,
      output: [
        ["mask", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"],
        ["mem", "8", 11],
      ],
    },
    {
      input: `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
          mem[8] = 11
          mem[7] = 101
          mem[8] = 0`,
      output: [
        ["mask", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"],
        ["mem", "8", 11],
        ["mem", "7", 101],
        ["mem", "8", 0],
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(parse(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("initialize", () => {
  const expectations = [
    {
      input: `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      mem[7] = 101
      mem[8] = 11`,
      output: {
        7: 101,
        8: 11,
      },
    },
    {
      input: `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
      mem[8] = 11
      mem[7] = 101
      mem[8] = 0`,
      output: {
        7: 101,
        8: 64,
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
