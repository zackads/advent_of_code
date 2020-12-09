var fs = require("fs");

const expenses = fs
  .readFileSync("input")
  .toString()
  .split("\n")
  .map((n) => parseInt(n, 10));

// I know this is Very Bad...
// but it was also Very Quick for me to write
// and Very Easy for you to understand ;-)
expenses.forEach((e1) => {
  expenses.forEach((e2) => {
    expenses.forEach((e3) => {
      if (e1 + e2 + e3 === 2020)
        console.log(`${e1} * ${e2} * ${e3} is ${e1 * e2 * e3}`);
    });
  });
});
