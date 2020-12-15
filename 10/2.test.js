const { memoize, countPaths } = require("./2");

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
        memoize(
          countPaths(
            test_case.input.graph,
            test_case.input.start,
            test_case.input.finish
          )
        )
      ).toEqual(test_case.output);
    });
  });
});
