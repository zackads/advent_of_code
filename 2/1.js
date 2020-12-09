let fs = require("fs");

const destructurePassword = (passwordWithRule) => {
  const raw = passwordWithRule.split(" ");
  return [raw[0].split("-").map((n) => parseInt(n, 10)), raw[1][0], raw[2]];
};

const count = (char, string) => {
  return string
    .split("")
    .reduce((count, c) => (c === char ? count + 1 : count), 0);
};

const passwordsWithRules = fs.readFileSync("input").toString().split("\n");

const validPasswordCount = passwordsWithRules.reduce((acc, cur) => {
  const [ruleRange, ruleLetter, password] = destructurePassword(cur);
  return count(ruleLetter, password) >= ruleRange[0] &&
    count(ruleLetter, password) <= ruleRange[1]
    ? (acc += 1)
    : acc;
}, 0);

console.log(validPasswordCount);
