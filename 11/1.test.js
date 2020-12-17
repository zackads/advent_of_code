const { expect, describe } = require("@jest/globals");
const { applyRules, repeatUntilStatic } = require("./1");

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
    {
      input: parse(`#.LL.L#.##
      #LLLLLL.L#
      L.L.L..L..
      #LLL.LL.L#
      #.LL.LL.LL
      #.LLLL#.##
      ..L.L.....
      #LLLLLLLL#
      #.LLLLLL.L
      #.#LLLL.##`),
      output: parse(`#.##.L#.##
      #L###LL.L#
      L.#.#..#..
      #L##.##.L#
      #.##.LL.LL
      #.###L#.##
      ..#.#.....
      #L######L#
      #.LL###L.L
      #.#L###.##`),
    },
    {
      input: parse(`#.##.L#.##
      #L###LL.L#
      L.#.#..#..
      #L##.##.L#
      #.##.LL.LL
      #.###L#.##
      ..#.#.....
      #L######L#
      #.LL###L.L
      #.#L###.##`),
      output: parse(`#.#L.L#.##
      #LLL#LL.L#
      L.L.L..#..
      #LLL.##.L#
      #.LL.LL.LL
      #.LL#L#.##
      ..L.L.....
      #L#LLLL#L#
      #.LLLLLL.L
      #.#L#L#.##`),
    },
    {
      input: parse(`#.#L.L#.##
      #LLL#LL.L#
      L.L.L..#..
      #LLL.##.L#
      #.LL.LL.LL
      #.LL#L#.##
      ..L.L.....
      #L#LLLL#L#
      #.LLLLLL.L
      #.#L#L#.##`),
      output: parse(`#.#L.L#.##
      #LLL#LL.L#
      L.#.L..#..
      #L##.##.L#
      #.#L.LL.LL
      #.#L#L#.##
      ..L.L.....
      #L#L##L#L#
      #.LLLLLL.L
      #.#L#L#.##`),
    },
    {
      input: parse(`#.#L.L#.##
      #LLL#LL.L#
      L.#.L..#..
      #L##.##.L#
      #.#L.LL.LL
      #.#L#L#.##
      ..L.L.....
      #L#L##L#L#
      #.LLLLLL.L
      #.#L#L#.##`),
      output: parse(`#.#L.L#.##
      #LLL#LL.L#
      L.#.L..#..
      #L##.##.L#
      #.#L.LL.LL
      #.#L#L#.##
      ..L.L.....
      #L#L##L#L#
      #.LLLLLL.L
      #.#L#L#.##`),
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input[0]} ... ] => [${test_case.output[0]} ... ]`, () => {
      expect(applyRules(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("repeatUntilStatic", () => {
  const expectations = [
    {
      input: parse(`L.LL.LL.LL
      LLLLLLL.LL
      L.L.L..L..
      LLLL.LL.LL
      L.LL.LL.LL
      L.LLLLL.LL
      ..L.L.....
      LLLLLLLLLL
      L.LLLLLL.L
      L.LLLLL.LL`),
      output: parse(`#.#L.L#.##
      #LLL#LL.L#
      L.#.L..#..
      #L##.##.L#
      #.#L.LL.LL
      #.#L#L#.##
      ..L.L.....
      #L#L##L#L#
      #.LLLLLL.L
      #.#L#L#.##`),
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input}] => [${test_case.output}]`, () => {
      expect(repeatUntilStatic(test_case.input)).toEqual(test_case.output);
    });
  });
});
