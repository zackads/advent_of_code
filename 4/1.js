var fs = require("fs");

const REQUIRED_FIELDS = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];
const passports = fs.readFileSync("input").toString().split("\n\n");

const validPassport = (passport) =>
  REQUIRED_FIELDS.every((field) => passport.includes(field));

const validPassportCount = passports.reduce(
  (acc, cur) => (validPassport(cur) ? (acc += 1) : acc),
  0
);

console.log(validPassportCount);
