let fs = require("fs");

const destructurePassword = (passwordWithRule) => {
  const raw = passwordWithRule.split(" ");
  return [raw[0].split("-").map((n) => parseInt(n, 10)), raw[1][0], raw[2]];
};

const valid = (char, positions, string) => {
  // Is char at exactly one of positions in string?
  return (
    positions.reduce((acc, cur) => {
      const zeroIndexedPosition = cur - 1;
      return (acc += string[zeroIndexedPosition] === char ? 1 : 0);
    }, 0) === 1
  );
};

const passwordsWithRules = fs.readFileSync("input").toString().split("\n");

const validPasswordCount = passwordsWithRules.reduce((acc, cur) => {
  const [ruleRange, ruleLetter, password] = destructurePassword(cur);

  return valid(ruleLetter, ruleRange, password) ? (acc += 1) : acc;
}, 0);

console.log(validPasswordCount);
