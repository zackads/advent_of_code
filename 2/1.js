let fs = require("fs");

const passwordsWithRules = fs.readFileSync("input").toString().split("\n");

const destructurePassword = (passwordWithRule) => {
  const raw = passwordWithRule.split(" ");
  return [raw[0].split("-").map((n) => parseInt(n, 10)), raw[1][0], raw[2]];
};

const count = (char, string) => {
  return string
    .split("")
    .reduce((count, c) => (c === char ? count + 1 : count), 0);
};

let validPasswordCount = 0;

passwordsWithRules.forEach((passwordWithRule) => {
  const [ruleRange, ruleLetter, password] = destructurePassword(
    passwordWithRule
  );

  const charCount = count(ruleLetter, password);

  if (charCount >= ruleRange[0] && charCount <= ruleRange[1]) {
    validPasswordCount += 1;
  }
});

console.log(validPasswordCount);
