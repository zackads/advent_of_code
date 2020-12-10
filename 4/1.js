var fs = require("fs");

const REQUIRED_FIELDS = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];
const passports = fs.readFileSync("input").toString().split("\n\n");

const validPassport = (passport) => {
  return REQUIRED_FIELDS.every((field) => {
    return passport.includes(field);
  });
};

const validPassportCount = passports.reduce((acc, cur) => {
  if (validPassport(cur)) {
    return (acc += 1);
  } else {
    return acc;
  }
}, 0);

console.log(validPassportCount);
