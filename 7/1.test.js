const { expect, describe } = require("@jest/globals");
const { parseRule, countShinyGoldBags } = require("./1");

describe("parseRule", () => {
  const expectations = [
    {
      input: "light blue bags contain 1 bright white bag",
      output: { "light blue": ["bright white"] },
    },
    {
      input: "dark red bags contain 1 bright white bag",
      output: { "dark red": ["bright white"] },
    },
    {
      input: "dark red bags contain 1 deep yellow bag",
      output: { "dark red": ["deep yellow"] },
    },
    {
      input: "dark red bags contain 1 deep yellow bag, 2 muted yellow bags",
      output: { "dark red": ["deep yellow", "muted yellow"] },
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

describe("countShinyGoldBags", () => {
  const expectations = [
    {
      input: {
        "plaid beige": ["drab magenta"],
        "drab magenta": ["deep red"],
        "deep red": [],
      },
      output: 0,
    },
    {
      input: {
        "plaid beige": ["drab magenta"],
        "obnoxious purple": ["shiny gold"],
        "drab magenta": [],
      },
      output: 1,
    },
    {
      input: {
        "plaid beige": ["drab magenta"],
        "drab magenta": ["shiny gold"],
        "shiny gold": [],
      },
      output: 2,
    },
    {
      input: {
        "light red": ["bright white", "muted yellow"],
        "dark orange": ["bright white", "muted yellow"],
        "bright white": ["shiny gold"],
        "muted yellow": ["shiny gold", "faded blue"],
        "shiny gold": ["dark olive", "vibrant plum"],
        "dark olive": ["faded blue", "dotted black"],
        "vibrant plum": ["faded blue", "dotted black"],
        "faded blue": [],
        "dotted black": [],
      },
      output: 4,
    },
  ];

  expectations.forEach((test_case) => {
    test(`input ${test_case.input} returns ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(countShinyGoldBags(test_case.input)).toEqual(test_case.output);
    });
  });
});
