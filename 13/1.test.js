const { expect, describe } = require("@jest/globals");
const { earliestBus } = require("./1.js");

describe("earliestBus", () => {
  const expectations = [
    {
      input: {
        earliest_departure: 0,
        bus_ids: [5],
      },
      output: {
        id: 5,
        wait: 5,
      },
    },
    {
      input: {
        earliest_departure: 0,
        bus_ids: [3, 5],
      },
      output: {
        id: 3,
        wait: 3,
      },
    },
    {
      input: {
        earliest_departure: 4,
        bus_ids: [3, 5],
      },
      output: {
        id: 5,
        wait: 1,
      },
    },
    {
      input: {
        earliest_departure: 6,
        bus_ids: [3, 5],
      },
      output: {
        id: 3,
        wait: 0,
      },
    },
    {
      input: {
        earliest_departure: 9,
        bus_ids: [3, 5],
      },
      output: {
        id: 3,
        wait: 0,
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`${JSON.stringify(test_case.input)} => ${JSON.stringify(
      test_case.output
    )}`, () => {
      expect(
        earliestBus(test_case.input.earliest_departure, test_case.input.bus_ids)
      ).toEqual(test_case.output);
    });
  });
});
