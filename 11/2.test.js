const { expect, describe } = require("@jest/globals");
const { visibleOccupiedSeats, applyRules, repeatUntilStatic } = require("./2");

const parse = (seatLayoutString) =>
  seatLayoutString.split("\n").map((line) => line.trim().split(""));

describe("visibleOccupiedSeats", () => {
  const expectations = [
    {
      input: [
        [
          [".", ".", "."],
          [".", "L", "."],
          [".", ".", "."],
        ],
        1,
        1,
      ],
      output: 0,
    },
    {
      input: [
        [
          [".", ".", "."],
          ["#", "L", "."],
          [".", ".", "."],
        ],
        1,
        1,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", ".", "."],
          ["#", "L", "#"],
          [".", ".", "."],
        ],
        1,
        1,
      ],
      output: 2,
    },
    {
      input: [
        [
          [".", "#", "."],
          [".", "L", "."],
          [".", ".", "."],
        ],
        1,
        1,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", ".", "."],
          [".", "L", "."],
          [".", "#", "."],
        ],
        1,
        1,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", "#", "."],
          [".", "L", "."],
          [".", "#", "."],
        ],
        1,
        1,
      ],
      output: 2,
    },
    {
      input: [
        [
          ["#", ".", "."],
          [".", "L", "."],
          [".", ".", "."],
        ],
        1,
        1,
      ],
      output: 1,
    },
    {
      input: [
        [
          ["#", ".", "#"],
          [".", "L", "."],
          [".", ".", "."],
        ],
        1,
        1,
      ],
      output: 2,
    },
    {
      input: [
        [
          ["#", ".", "#"],
          [".", "L", "."],
          ["#", ".", "#"],
        ],
        1,
        1,
      ],
      output: 4,
    },
    {
      input: [
        [
          [".", ".", ".", "."],
          [".", "L", "#", "#"],
          [".", ".", ".", "."],
          [".", ".", ".", "."],
        ],
        1,
        1,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", ".", ".", "."],
          ["#", "#", "L", "."],
          [".", ".", ".", "."],
          [".", ".", ".", "."],
        ],
        1,
        2,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", ".", ".", "."],
          [".", ".", "L", "."],
          [".", ".", "#", "."],
          [".", ".", "#", "."],
        ],
        1,
        2,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", ".", ".", "."],
          [".", ".", "L", "."],
          [".", "#", ".", "."],
          ["#", ".", ".", "."],
        ],
        1,
        2,
      ],
      output: 1,
    },
    {
      input: [
        [
          [".", ".", ".", ".", "."],
          [".", ".", "L", ".", "."],
          [".", "#", ".", ".", "."],
          ["#", ".", ".", ".", "#"],
        ],
        1,
        2,
      ],
      output: 2,
    },
    {
      input: [
        [
          [".", ".", ".", ".", "."],
          [".", "#", ".", ".", "."],
          [".", "L", ".", ".", "."],
          [".", "L", ".", ".", "."],
        ],
        3,
        1,
      ],
      output: 0,
    },
    {
      input: [
        parse(`.......#.
               ...#.....
               .#.......
               .........
               ..#L....#
               ....#....
               .........
               #........
               ...#.....`),
        4,
        3,
      ],
      output: 8,
    },
    {
      input: [
        parse(`.............
            .L.L.#.#.#.#.
            .............`),
        1,
        1,
      ],
      output: 0,
    },
    {
      input: [
        parse(`.##.##.
            #.#.#.#
            ##...##
            ...L...
            ##...##
            #.#.#.#
            .##.##.`),
        3,
        3,
      ],
      output: 0,
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input}] => [${test_case.output}]`, () => {
      expect(visibleOccupiedSeats(...test_case.input)).toEqual(
        test_case.output
      );
    });
  });
});

describe("applyRules", () => {
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
      output: parse(`#.##.##.##
      #######.##
      #.#.#..#..
      ####.##.##
      #.##.##.##
      #.#####.##
      ..#.#.....
      ##########
      #.######.#
      #.#####.##`),
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
      output: parse(`#.LL.LL.L#
      #LLLLLL.LL
      L.L.L..L..
      LLLL.LL.LL
      L.LL.LL.LL
      L.LLLLL.LL
      ..L.L.....
      LLLLLLLLL#
      #.LLLLLL.L
      #.LLLLL.L#`),
    },
    {
      input: parse(`#.LL.LL.L#
                    #LLLLLL.LL
                    L.L.L..L..
                    LLLL.LL.LL
                    L.LL.LL.LL
                    L.LLLLL.LL
                    ..L.L.....
                    LLLLLLLLL#
                    #.LLLLLL.L
                    #.LLLLL.L#`),
      output: parse(`#.L#.##.L#
                     #L#####.LL
                     L.#.#..#..
                     ##L#.##.##
                     #.##.#L.##
                     #.#####.#L
                     ..#.#.....
                     LLL####LL#
                     #.L#####.L
                     #.L####.L#`),
    },
    {
      input: parse(`#.L#.##.L#
        #L#####.LL
        L.#.#..#..
        ##L#.##.##
        #.##.#L.##
        #.#####.#L
        ..#.#.....
        LLL####LL#
        #.L#####.L
        #.L####.L#`),
      output: parse(`#.L#.L#.L#
        #LLLLLL.LL
        L.L.L..#..
        ##LL.LL.L#
        L.LL.LL.L#
        #.LLLLL.LL
        ..L.L.....
        LLLLLLLLL#
        #.LLLLL#.L
        #.L#LL#.L#`),
    },
    {
      input: parse(`#.L#.L#.L#
        #LLLLLL.LL
        L.L.L..#..
        ##LL.LL.L#
        L.LL.LL.L#
        #.LLLLL.LL
        ..L.L.....
        LLLLLLLLL#
        #.LLLLL#.L
        #.L#LL#.L#`),
      output: parse(`#.L#.L#.L#
        #LLLLLL.LL
        L.L.L..#..
        ##L#.#L.L#
        L.L#.#L.L#
        #.L####.LL
        ..#.#.....
        LLL###LLL#
        #.LLLLL#.L
        #.L#LL#.L#`),
    },
    {
      input: parse(`#.L#.L#.L#
        #LLLLLL.LL
        L.L.L..#..
        ##L#.#L.L#
        L.L#.#L.L#
        #.L####.LL
        ..#.#.....
        LLL###LLL#
        #.LLLLL#.L
        #.L#LL#.L#`),
      output: parse(`#.L#.L#.L#
        #LLLLLL.LL
        L.L.L..#..
        ##L#.#L.L#
        L.L#.LL.L#
        #.LLLL#.LL
        ..#.L.....
        LLL###LLL#
        #.LLLLL#.L
        #.L#LL#.L#`),
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input}] => [${test_case.output}]`, () => {
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
      output: parse(`#.L#.L#.L#
      #LLLLLL.LL
      L.L.L..#..
      ##L#.#L.L#
      L.L#.LL.L#
      #.LLLL#.LL
      ..#.L.....
      LLL###LLL#
      #.LLLLL#.L
      #.L#LL#.L#`),
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.input}] => [${test_case.output}]`, () => {
      expect(repeatUntilStatic(test_case.input)).toEqual(test_case.output);
    });
  });
});
