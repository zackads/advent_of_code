const { createGraph, countPaths } = require("./2");

describe("createGraph", () => {
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
      expect(createGraph(test_case.power_adapters)).toEqual(
        test_case.directed_adjacency_list
      );
    });
  });
});

describe("countPaths", () => {
  const expectations = [
    {
      input: {
        graph: {
          1: [3],
          3: [],
        },
        start: 1,
        finish: 3,
      },
      output: 1,
    },
    {
      input: {
        graph: {
          1: [3],
          3: [5],
          5: [],
        },
        start: 1,
        finish: 5,
      },
      output: 1,
    },
    {
      input: {
        graph: {
          2: [3, 4],
          3: [4],
          4: [],
        },
        start: 2,
        finish: 4,
      },
      output: 2,
    },
    {
      input: {
        graph: {
          2: [3, 4],
          3: [4, 7],
          4: [7],
          7: [],
        },
        start: 2,
        finish: 7,
      },
      output: 3,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${test_case.output}`, () => {
      expect(
        countPaths(
          test_case.input.graph,
          test_case.input.start,
          test_case.input.finish
        )
      ).toEqual(test_case.output);
    });
  });
});
