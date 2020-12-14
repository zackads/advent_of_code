const { expect, describe } = require("@jest/globals");
const { firstNumNotSumOfTwoPreceedingNNumbers } = require("./1");

describe("changeMe", () => {
  const expectations = [
    {
      numbers: [1, 2, 4],
      n: 2,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 4,
    },
    {
      numbers: [1, 2, 5],
      n: 2,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 5,
    },
    {
      numbers: [1, 2, 3, 7],
      n: 2,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 7,
    },
    {
      numbers: [1, 2, 3, 7, 10],
      n: 2,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 7,
    },
    {
      numbers: [1, 4, 3, 7, 92],
      n: 3,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 92,
    },
    {
      numbers: [1, 4, 3, 7, 12],
      n: 3,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 12,
    },
    {
      numbers: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        65,
      ],
      n: 25,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 65,
    },
    {
      numbers: [
        35,
        20,
        15,
        25,
        47,
        40,
        62,
        55,
        65,
        95,
        102,
        117,
        150,
        182,
        127,
        219,
        299,
        277,
        309,
        576,
      ],
      n: 5,
      first_number_not_the_sum_of_two_of_preceeding_n_numbers: 127,
    },
  ];

  expectations.forEach((test_case) => {
    test(`first number not the sum of two preceeding ${test_case.n} numbers is ${test_case.first_number_not_the_sum_of_two_of_preceeding_n_numbers}`, () => {
      expect(
        firstNumNotSumOfTwoPreceedingNNumbers(test_case.numbers, test_case.n)
      ).toEqual(
        test_case.first_number_not_the_sum_of_two_of_preceeding_n_numbers
      );
    });
  });
});
