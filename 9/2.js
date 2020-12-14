const fs = require("fs");
const numbers = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((str) => parseInt(str));

const firstNumNotSumOfTwoPreceedingNNumbers = (numbers, n) => {
  for (let i = n; i < numbers.length; i++) {
    const preceedingN = numbers.slice(i - n, i);
    if (!sumsOfTwo(preceedingN).includes(numbers[i])) {
      return numbers[i];
    }
  }
};

const sumsOfTwo = (numbers) => {
  const sums = new Set();
  numbers.forEach((num1, index1) => {
    numbers.forEach((num2, index2) => {
      if (index1 !== index2) sums.add(num1 + num2);
    });
  });
  return Array.from(sums);
};

const answerFromPart1 = firstNumNotSumOfTwoPreceedingNNumbers(numbers, 25);

const sum = (numbers) => numbers.reduce((a, b) => a + b, 0);

const findContiguousSetOfTwoOrMoreNumsThatSumToX = (numbers, x) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; sum(numbers.slice(i, j)) <= x; j++) {
      if (sum(numbers.slice(i, j)) === x) return numbers.slice(i, j);
    }
  }
};

const contiguousRange = findContiguousSetOfTwoOrMoreNumsThatSumToX(
  numbers,
  answerFromPart1
);
const part2Answer = Math.max(...contiguousRange) + Math.min(...contiguousRange);
console.log(part2Answer);

module.exports = {
  firstNumNotSumOfTwoPreceedingNNumbers: firstNumNotSumOfTwoPreceedingNNumbers,
};
