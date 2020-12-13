const { expect, describe } = require("@jest/globals");
const { Game } = require("./1");

describe("Game", () => {
  const expectations = [
    {
      instructions: ["nop +0"],
      accumulator_value_before_second_execution: 0,
    },
    {
      instructions: ["acc +1"],
      accumulator_value_before_second_execution: 1,
    },
    {
      instructions: ["acc -1"],
      accumulator_value_before_second_execution: -1,
    },
    {
      instructions: ["acc +42"],
      accumulator_value_before_second_execution: 42,
    },
    {
      instructions: ["acc -1664"],
      accumulator_value_before_second_execution: -1664,
    },
    {
      instructions: ["acc +42", "acc -7"],
      accumulator_value_before_second_execution: 35,
    },
    {
      instructions: ["acc +42", "nop +0", "acc -7"],
      accumulator_value_before_second_execution: 35,
    },
    {
      instructions: ["acc +1", "jmp +1", "acc +3"],
      accumulator_value_before_second_execution: 4,
    },
    {
      instructions: ["acc +1", "jmp +2", "acc +1", "acc - 1"],
      accumulator_value_before_second_execution: 0,
    },
  ];

  expectations.forEach((test_case) => {
    test(`instructions ${JSON.stringify(
      test_case.instructions
    )} results in accumulator value of ${
      test_case.accumulator_value_before_second_execution
    }`, () => {
      // Arrange
      const game = new Game(test_case.instructions);

      // Act
      game.play();
      const accumulator = game.accumulator;

      // Assert
      expect(accumulator).toEqual(
        test_case.accumulator_value_before_second_execution
      );
    });
  });
});
