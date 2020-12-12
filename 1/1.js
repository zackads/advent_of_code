var fs = require("fs");

const expenses = fs
  .readFileSync("input")
  .toString()
  .split("\n")
  .map((n) => parseInt(n, 10));

// I know this is Very Bad...
// but it was also Very Quick for me to write
// and Very Easy for you to understand ;-)
console.log("Old way...");
expenses.forEach((expense1) => {
  expenses.forEach((expense2) => {
    if (expense1 + expense2 === 2020)
      console.log(
        `${expense1} multiplied by ${expense2} is ${expense1 * expense2}`
      );
  });
});

console.log("New way (with a set)...");
const expenseSet = new Set();
expenses.forEach((expense) => {
  if (expenseSet.has(expense)) {
    console.log((2020 - expense) * expense);
    return (2020 - expense) * expense;
  }
  expenseSet.add(2020 - expense);
});
