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

describe("parse()", () => {
  const expectations = [
    {
      input: ".#.\n..#\n###",
      output: [
        { x: 0, y: 0, z: 0, value: "." },
        { x: 1, y: 0, z: 0, value: "#" },
        { x: 2, y: 0, z: 0, value: "." },
        { x: 0, y: 1, z: 0, value: "." },
        { x: 1, y: 1, z: 0, value: "." },
        { x: 2, y: 1, z: 0, value: "#" },
        { x: 0, y: 2, z: 0, value: "#" },
        { x: 1, y: 2, z: 0, value: "#" },
        { x: 2, y: 2, z: 0, value: "#" },
      ],
    },
    {
      input: "...\n#.#\n#..",
      output: [
        { x: 0, y: 0, z: 0, value: "." },
        { x: 1, y: 0, z: 0, value: "." },
        { x: 2, y: 0, z: 0, value: "." },
        { x: 0, y: 1, z: 0, value: "#" },
        { x: 1, y: 1, z: 0, value: "." },
        { x: 2, y: 1, z: 0, value: "#" },
        { x: 0, y: 2, z: 0, value: "#" },
        { x: 1, y: 2, z: 0, value: "." },
        { x: 2, y: 2, z: 0, value: "." },
      ],
    },
    {
      input: "...#\n#.##\n#..#",
      output: [
        { x: 0, y: 0, z: 0, value: "." },
        { x: 1, y: 0, z: 0, value: "." },
        { x: 2, y: 0, z: 0, value: "." },
        { x: 3, y: 0, z: 0, value: "#" },
        { x: 0, y: 1, z: 0, value: "#" },
        { x: 1, y: 1, z: 0, value: "." },
        { x: 2, y: 1, z: 0, value: "#" },
        { x: 3, y: 1, z: 0, value: "#" },
        { x: 0, y: 2, z: 0, value: "#" },
        { x: 1, y: 2, z: 0, value: "." },
        { x: 2, y: 2, z: 0, value: "." },
        { x: 3, y: 2, z: 0, value: "#" },
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input).slice(
      0,
      15
    )}... => ${JSON.stringify(test_case.output).slice(0, 15)}`, () => {
      expect(parse(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe.skip("pad()", () => {
  const expectations = [
    {
      input: [
        [
          [".", "#", "."],
          [".", ".", "#"],
          ["#", "#", "#"],
        ],
      ],
      output: [
        [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ],
        [
          [".", ".", ".", ".", "."],
          [".", ".", "#", ".", "."],
          [".", ".", ".", "#", "."],
          [".", "#", "#", "#", "."],
          [".", ".", ".", ".", "."],
        ],
        [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ],
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input).slice(
      0,
      15
    )}... => ${JSON.stringify(test_case.output).slice(0, 15)}...`, () => {
      expect(pad(test_case.input)).toEqual(test_case.output);
    });
  });
});
