const { expect, describe } = require("@jest/globals");
const { Ship } = require("./Ship1");
const { manhattan_distance } = require("./1.js");

describe("ship", () => {
  const expectations = [
    {
      evasive_actions: [],
      end_position: {
        east: 0,
        north: 0,
      },
    },
    {
      evasive_actions: ["F10"],
      end_position: {
        east: 10,
        north: 0,
      },
    },
    {
      evasive_actions: ["F3"],
      end_position: {
        east: 3,
        north: 0,
      },
    },
    {
      evasive_actions: ["N3"],
      end_position: {
        east: 0,
        north: 3,
      },
    },
    {
      evasive_actions: ["S4"],
      end_position: {
        east: 0,
        north: -4,
      },
    },
    {
      evasive_actions: ["W9"],
      end_position: {
        east: -9,
        north: 0,
      },
    },
    {
      evasive_actions: ["L90"],
      end_position: {
        east: 0,
        north: 0,
      },
    },
    {
      evasive_actions: ["F3", "F10"],
      end_position: {
        east: 13,
        north: 0,
      },
    },
    {
      evasive_actions: ["L90", "F10"],
      end_position: {
        east: 0,
        north: 10,
      },
    },
    {
      evasive_actions: ["R90", "F10"],
      end_position: {
        east: 0,
        north: -10,
      },
    },
    {
      evasive_actions: ["F10", "N3", "F7", "R90", "F11"],
      end_position: {
        east: 17,
        north: -8,
      },
    },
    {
      evasive_actions: ["R270", "R270", "F1"],
      end_position: {
        east: -1,
        north: 0,
      },
    },
    {
      evasive_actions: ["L180", "F1"],
      end_position: {
        east: -1,
        north: 0,
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

      expect(ship.current_position).toEqual(test_case.end_position);
    });
  });
});

describe("manhattan_position", () => {
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
