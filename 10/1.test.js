const { expect, describe } = require("@jest/globals");
const { product1and3JoltDiffs } = require("./1");

describe("product1and3JoltDiffs", () => {
  const expectations = [
    {
      adapters: [
        28,
        33,
        18,
        42,
        31,
        14,
        46,
        20,
        48,
        47,
        24,
        23,
        49,
        45,
        19,
        38,
        39,
        11,
        1,
        32,
        25,
        35,
        8,
        17,
        7,
        9,
        4,
        2,
        34,
        10,
        3,
      ],
      product_1_and_3_jolt_diffs: 220,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.adapters)} => [${
      test_case.product_1_and_3_jolt_diffs
    }]`, () => {
      expect(product1and3JoltDiffs(test_case.adapters)).toEqual(
        test_case.product_1_and_3_jolt_diffs
      );
    });
  });
});
