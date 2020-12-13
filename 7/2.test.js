const { expect, describe } = require("@jest/globals");
const { parseRule, countBags } = require("./2");

describe("parseRule", () => {
  const expectations = [
    {
      input: "light blue bags contain 1 bright white bag",
      output: { "light blue": [[1, "bright white"]] },
    },
    {
      input: "dark red bags contain 1 bright white bag",
      output: { "dark red": [[1, "bright white"]] },
    },
    {
      input: "dark red bags contain 1 deep yellow bag",
      output: { "dark red": [[1, "deep yellow"]] },
    },
    {
      input: "dark red bags contain 1 deep yellow bag, 2 muted yellow bags",
      output: {
        "dark red": [
          [1, "deep yellow"],
          [2, "muted yellow"],
        ],
      },
    },
    {
      input: "deep pink bags contain no other bags",
      output: { "deep pink": [] },
    },
  ];

  expectations.forEach((test_case) => {
    test(`input ${test_case.input} returns ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(parseRule(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("countBags", () => {
  const expectations = [
    {
      input: [
        "shiny gold",
        {
          "shiny gold": [],
        },
      ],
      output: 0,
    },
    {
      input: [
        "shiny gold",
        {
          "shiny gold": [[1, "deep red"]],
          "deep red": [],
        },
      ],
      output: 1,
    },
    {
      input: [
        "shiny gold",
        {
          "shiny gold": [[1, "deep red"]],
          "deep red": [[1, "passionate yellow"]],
          "passionate yellow": [],
        },
      ],
      output: 2,
    },
    {
      input: [
        "shiny gold",
        {
          "shiny gold": [[2, "deep red"]],
          "deep red": [[1, "passionate yellow"]],
          "passionate yellow": [],
        },
      ],
      output: 4,
    },
    {
      input: [
        "shiny gold",
        {
          "shiny gold": [
            [1, "dark olive"],
            [2, "vibrant plum"],
          ],
          "faded blue": [],
          "dotted black": [],
          "vibrant plum": [
            [5, "faded blue"],
            [6, "dotted black"],
          ],
          "dark olive": [
            [3, "faded blue"],
            [4, "dotted black"],
          ],
        },
      ],
      output: 32,
    },
  ];

  expectations.forEach((test_case) => {
    test(`input ${JSON.stringify(test_case.input)} returns ${
      test_case.output
    }`, () => {
      expect(countBags(...test_case.input)).toEqual(test_case.output);
    });
  });
});
