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

console.log(numbers);
console.log(firstNumNotSumOfTwoPreceedingNNumbers(numbers, 25));

module.exports = {
  firstNumNotSumOfTwoPreceedingNNumbers: firstNumNotSumOfTwoPreceedingNNumbers,
};
