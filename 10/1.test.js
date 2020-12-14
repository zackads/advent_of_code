const { expect, describe } = require("@jest/globals");
const { adjacencyList, longestPath, product1and3JoltDiffs } = require("./1");

describe("adjacencyList", () => {
  const expectations = [
    {
      power_adapters: [1, 3],
      directed_adjacency_list: {
        1: [3],
        3: [],
      },
    },
    {
      power_adapters: [2, 4],
      directed_adjacency_list: {
        2: [4],
        4: [],
      },
    },
    {
      power_adapters: [1, 3, 5],
      directed_adjacency_list: {
        1: [3],
        3: [5],
        5: [],
      },
    },
    {
      power_adapters: [2, 3, 4, 7],
      directed_adjacency_list: {
        2: [3, 4],
        3: [4],
        4: [7],
        7: [],
      },
    },
    {
      power_adapters: [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4],
      directed_adjacency_list: {
        1: [4],
        4: [5, 6, 7],
        5: [6, 7],
        6: [7],
        7: [10],
        10: [11, 12],
        11: [12],
        12: [15],
        15: [16],
        16: [19],
        19: [],
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`${test_case.power_adapters} => ${JSON.stringify(
      test_case.directed_adjacency_list
    )}`, () => {
      expect(adjacencyList(test_case.power_adapters)).toEqual(
        test_case.directed_adjacency_list
      );
    });
  });
});

describe("longestPath", () => {
  const expectations = [
    {
      directed_adjacency_list: {},
      longest_path: [],
    },
    {
      directed_adjacency_list: {
        1: [3],
        3: [],
      },
      longest_path: [1, 3],
    },
    {
      directed_adjacency_list: {
        1: [3],
        3: [5],
        5: [],
      },
      longest_path: [1, 3, 5],
    },
    {
      directed_adjacency_list: {
        2: [3, 4],
        3: [4],
        4: [],
      },
      longest_path: [2, 3, 4],
    },
    {
      directed_adjacency_list: {
        2: [3, 4],
        3: [4],
        4: [7],
        7: [],
      },
      longest_path: [2, 3, 4, 7],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.directed_adjacency_list)} => [${
      test_case.longest_path
    }]`, () => {
      expect(longestPath(test_case.directed_adjacency_list)).toEqual(
        test_case.longest_path
      );
    });
  });
});

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
