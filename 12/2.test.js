const { expect, describe } = require("@jest/globals");
const { Ship } = require("./Ship2");
const { manhattan_distance } = require("./2.js");

describe("ship", () => {
  const expectations = [
    {
      evasive_actions: ["F1"],
      end_position: {
        east: 10,
        north: 1,
      },
    },
    {
      evasive_actions: ["F10"],
      end_position: {
        east: 100,
        north: 10,
      },
    },
    {
      evasive_actions: ["N3", "F1"],
      end_position: {
        east: 10,
        north: 4,
      },
    },
    {
      evasive_actions: ["S3", "F1"],
      end_position: {
        east: 10,
        north: -2,
      },
    },
    {
      evasive_actions: ["S3", "F10"],
      end_position: {
        east: 100,
        north: -20,
      },
    },
    {
      evasive_actions: ["W3", "F1"],
      end_position: {
        east: 7,
        north: 1,
      },
    },
    {
      evasive_actions: ["W3", "F10"],
      end_position: {
        east: 70,
        north: 10,
      },
    },
    {
      evasive_actions: ["E2", "F1"],
      end_position: {
        east: 12,
        north: 1,
      },
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${test_case.evasive_actions}] => ${JSON.stringify(
      test_case.end_position
    )}`, () => {
      // Arrange
      const ship = new Ship();

      // Act
      test_case.evasive_actions.forEach((evasive_action) => {
        ship.move(evasive_action);
      });

      expect(ship.position).toEqual(test_case.end_position);
    });
  });
});

describe.skip("manhattan_position", () => {
  const expectations = [
    {
      end_position: {
        east: 17,
        north: -8,
      },
      manhattan_distance: 25,
    },
  ];

  expectations.forEach((test_case) => {
    test(`[${JSON.stringify(test_case.end_position)}] => ${JSON.stringify(
      test_case.manhattan_distance
    )}`, () => {
      expect(manhattan_distance(test_case.end_position)).toEqual(
        test_case.manhattan_distance
      );
    });
  });
});
