const { expect, describe } = require("@jest/globals");
const { applyRules } = require("./1");

const parse = (seatLayoutString) =>
  seatLayoutString.split("\n").map((line) => line.trim().split(""));

describe.skip("parse", () => {
  const expectations = [
    {
      input: "L.LL.LL.LL",
      output: [["L", ".", "L", "L", ".", "L", "L", ".", "L", "L"]],
    },
    {
      input: "#.##.##.##",
      output: [["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"]],
    },
    {
      input: "#.##.##.##\n#######.##",
      output: [
        ["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"],
        ["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"],
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input}] => [${test_case.output}]`, () => {
      expect(parse(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("applyRules", () => {
  const expectations = [
    {
      input: [["L", ".", "L", "L", ".", "L", "L", ".", "L", "L"]],
      output: [["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"]],
    },
    {
      input: [["L", "L", "L", "L", "L", "L", "L", ".", "L", "L"]],
      output: [["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"]],
    },
    {
      input: [["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"]],
      output: [["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"]],
    },
    {
      input: [
        ["L", ".", "L", "L", ".", "L", "L", ".", "L", "L"],
        ["L", "L", "L", "L", "L", "L", "L", ".", "L", "L"],
      ],
      output: [
        ["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"],
        ["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"],
      ],
    },
    {
      input: parse(`#.##.##.##
                     #######.##
                     #.#.#..#..`),
      output: parse(`#.LL.L#.##
                     #LLLLLL.L#
                     #.#.#..#..`),
    },
    {
      input: parse(`#.##.##.##
                    #######.##
                    #.#.#..#..
                    ####.##.##
                    #.##.##.##
                    #.#####.##
                    ..#.#.....
                    ##########
                    #.######.#
                    #.#####.##`),
      output: parse(`#.LL.L#.##
                    #LLLLLL.L#
                    L.L.L..L..
                    #LLL.LL.L#
                    #.LL.LL.LL
                    #.LLLL#.##
                    ..L.L.....
                    #LLLLLLLL#
                    #.LLLLLL.L
                    #.#LLLL.##`),
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input}] => [${test_case.output}]`, () => {
      expect(applyRules(test_case.input)).toEqual(test_case.output);
    });
  });
});
