const { expect, describe } = require("@jest/globals");
const { rotate90, flip, isNeighbour, permutations } = require("./1.js");

describe("rotate90()", () => {
  const expectations = [
    {
      input: [
        ["#", ".", "#"],
        ["#", ".", "#"],
        ["#", ".", "#"],
      ],
      output: [
        ["#", "#", "#"],
        [".", ".", "."],
        ["#", "#", "#"],
      ],
    },
    {
      input: [
        ["#", "#", "#"],
        [".", ".", "."],
        ["#", "#", "#"],
      ],
      output: [
        ["#", ".", "#"],
        ["#", ".", "#"],
        ["#", ".", "#"],
      ],
    },
    {
      input: [
        ["#", "#", "#", "#"],
        [".", ".", ".", "."],
        ["#", "#", "#", "#"],
        [".", ".", ".", "."],
      ],
      output: [
        [".", "#", ".", "#"],
        [".", "#", ".", "#"],
        [".", "#", ".", "#"],
        [".", "#", ".", "#"],
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(rotate90(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("isNeighbour()", () => {
  const expectations = [
    {
      input: {
        // tile1 on top of tile2
        tile1: [
          ["#", ".", "#"],
          [".", "#", "."],
          [".", ".", "#"],
        ],
        tile2: [
          [".", ".", "#"],
          ["#", "#", "."],
          ["#", ".", "."],
        ],
      },
      output: true,
    },
    {
      // tile2 on top of tile1
      input: {
        tile1: [
          ["#", ".", "#"],
          ["X", "X", "X"],
          ["X", "X", "X"],
        ],
        tile2: [
          ["X", "X", "X"],
          ["X", "X", "X"],
          ["#", ".", "#"],
        ],
      },
      output: true,
    },
    {
      // tile2 to right of tile1
      input: {
        tile1: [
          ["#", ".", "#"],
          [".", "#", "."],
          [".", ".", "#"],
        ],
        tile2: [
          ["#", ".", "#"],
          [".", "#", "."],
          ["#", "X", "X"],
        ],
      },
      output: true,
    },
    {
      // tile2 to left of tile1
      input: {
        tile1: [
          ["#", "X", "X"],
          [".", "X", "X"],
          [".", "X", "X"],
        ],
        tile2: [
          ["X", "X", "#"],
          ["X", "X", "."],
          ["X", "X", "."],
        ],
      },
      output: true,
    },
    {
      // tile2 flipped on vertical axis to left of tile1
      input: {
        tile1: [
          ["#", "X", "1"],
          [".", "X", "5"],
          [".", "X", "6"],
        ],
        tile2: [
          ["#", "1", "2"],
          [".", "5", "3"],
          [".", "6", "4"],
        ],
      },
      output: true,
    },
    {
      input: {
        tile1: [
          ["#", ".", "#", ".", "#", "#", "#", "#", "#", "."],
          [".", "#", ".", ".", "#", "#", "#", "#", "#", "#"],
          [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
          ["#", "#", "#", "#", "#", "#", ".", ".", ".", "."],
          ["#", "#", "#", "#", ".", "#", ".", ".", "#", "."],
          [".", "#", ".", ".", ".", "#", ".", "#", "#", "."],
          ["#", ".", "#", "#", "#", "#", "#", ".", "#", "#"],
          [".", ".", "#", ".", "#", "#", "#", ".", ".", "."],
          [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", "#", ".", "#", "#", "#", ".", ".", "."],
        ],
        tile2: [
          [".", ".", "#", "#", ".", "#", ".", ".", "#", "."],
          ["#", "#", ".", ".", "#", ".", ".", ".", ".", "."],
          ["#", ".", ".", ".", "#", "#", ".", ".", "#", "."],
          ["#", "#", "#", "#", ".", "#", ".", ".", ".", "#"],
          ["#", "#", ".", "#", "#", ".", "#", "#", "#", "."],
          ["#", "#", ".", ".", ".", "#", ".", "#", "#", "#"],
          [".", "#", ".", "#", ".", "#", ".", ".", "#", "#"],
          [".", ".", "#", ".", ".", ".", ".", "#", ".", "."],
          ["#", "#", "#", ".", ".", ".", "#", ".", "#", "."],
          [".", ".", "#", "#", "#", ".", ".", "#", "#", "#"],
        ],
      },
      output: true,
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input).slice(
      0,
      15
    )}... => ${JSON.stringify(test_case.output).slice(0, 15)}...`, () => {
      expect(isNeighbour(test_case.input.tile1, test_case.input.tile2)).toEqual(
        test_case.output
      );
    });
  });
});

describe("flip()", () => {
  const expectations = [
    {
      input: [
        ["#", ".", "."],
        ["#", ".", "."],
        ["#", ".", "."],
      ],
      output: [
        [".", ".", "#"],
        [".", ".", "#"],
        [".", ".", "#"],
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(flip(test_case.input)).toEqual(test_case.output);
    });
  });
});
