const { expect, describe } = require("@jest/globals");
const { parseRule, defineBags, bagTree } = require("./1");

describe("parseRule", () => {
  const expectations = [
    {
      input: "light blue bags contain 1 bright white bag",
      output: ["light blue", "bright white"],
    },
    {
      input: "dark red bags contain 1 bright white bag",
      output: ["dark red", "bright white"],
    },
    {
      input: "dark red bags contain 1 deep yellow bag",
      output: ["dark red", "deep yellow"],
    },
    {
      input: "dark red bags contain 1 deep yellow bag, 2 muted yellow bags",
      output: ["dark red", "deep yellow", "muted yellow"],
    },
    {
      input: "deep pink bags contain no other bags",
      output: ["deep pink"],
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

describe("defineBags", () => {
  const expectations = [
    {
      input: ["light blue", "bright white"],
      output: { "light blue": [{ "bright white": [] }] },
    },
    {
      input: ["dark red", "bright white"],
      output: { "dark red": [{ "bright white": [] }] },
    },
    {
      input: ["dark red", "brilliant yellow"],
      output: { "dark red": [{ "brilliant yellow": [] }] },
    },
    {
      input: ["dark red", "brilliant yellow", "starfish orange"],
      output: {
        "dark red": [{ "brilliant yellow": [] }, { "starfish orange": [] }],
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`input ${test_case.input} returns ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(defineBags(test_case.input)).toEqual(test_case.output);
    });
  });
});

describe("bagTree", () => {
  const expectations = [
    {
      input: [
        ["light blue", "bright white"],
        ["bright white", "deep red"],
      ],
      output: [
        ["light blue", "bright white", "deep red"],
        ["bright white", "deep red"],
      ],
    },
    {
      input: [
        ["light blue", "bright white"],
        ["bright white", "hot pink"],
      ],
      output: [
        ["light blue", "bright white", "hot pink"],
        ["bright white", "hot pink"],
      ],
    },
    {
      input: [
        ["light blue", "bright white", "hot pink"],
        ["bright white", "hot pink"],
        ["hot pink", "deep blue"],
      ],
      output: [
        ["light blue", "bright white", "hot pink", "deep blue"],
        ["bright white", "hot pink", "deep blue"],
        ["hot pink", "deep blue"],
      ],
    },
    {
      input: [
        ["cajun pink", "bright white"],
        ["bright white", "deep red"],
      ],
      output: [
        ["cajun pink", "bright white", "deep red"],
        ["bright white", "deep red"],
      ],
    },
  ];

  expectations.forEach((test_case) => {
    test(`input ${test_case.input} returns ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(bagTree(test_case.input)).toEqual(test_case.output);
    });
  });
});
