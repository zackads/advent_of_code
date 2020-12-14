const { expect, describe } = require("@jest/globals");
const { firstNumNotSumOfTwoPreceedingNNumbers } = require("./1");

describe("changeMe", () => {
  const expectations = [
    {
      numbers: [1, 2, 3],
      n: 2,
      first_number_not_the_sum_of_two_preceeding_n_numbers: 3,
    },
  ];

  expectations.forEach((test_case) => {
    test(`first number not the sum of two preceeding ${test_case.n} numbers is ${test_case.first_number_not_the_sum_of_two_preceeding_n_numbers}`, () => {
      expect(
        firstNumNotSumOfTwoPreceedingNNumbers(test_case.numbers, test_case.n)
      ).toEqual(test_case.first_number_not_the_sum_of_two_preceeding_n_numbers);
    });
  });
});
