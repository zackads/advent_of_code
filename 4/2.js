var fs = require("fs");

const rules = {
  validBirthYear: (passport) =>
    passport.hasOwnProperty("byr") &&
    passport.byr.length === 4 &&
    passport.byr >= 1920 &&
    passport.byr <= 2002,
  validIssueYear: (passport) =>
    passport.hasOwnProperty("iyr") &&
    passport.iyr.length === 4 &&
    passport.iyr >= 2010 &&
    passport.iyr <= 2020,
  validExpirationYear: (passport) =>
    passport.hasOwnProperty("eyr") &&
    passport.eyr.length === 4 &&
    passport.eyr >= 2020 &&
    passport.eyr <= 2030,
  validHeight: (passport) => {
    if (passport.hasOwnProperty("hgt")) {
      const unit = passport.hgt.slice(-2);
      const value = passport.hgt.slice(0, -2);

      if (unit === "cm") return value >= 150 && value <= 193;
      if (unit === "in") return value >= 59 && value <= 76;
    }
    return false;
  },
  validHairColour: (passport) => {
    const hexStringRegex = /^#[0-9a-f]{6}$/;
    return passport.hasOwnProperty("hcl") && hexStringRegex.test(passport.hcl);
  },
  validEyeColour: (passport) => {
    const validEyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    return (
      passport.hasOwnProperty("ecl") && validEyeColours.includes(passport.ecl)
    );
  },
  validPassportId: (passport) => {
    return (
      Boolean(Number(passport.pid)) && passport.pid.toString().length === 9
    );
  },
};

const validPassport = (passport, rules) =>
  Object.values(rules).every((rule) => rule(passport));

const parsePassport = (passport) =>
  passport.split(/\s/g).reduce(
    (obj, item) => ({
      ...obj,
      [item.split(":")[0]]: item.split(":")[1],
    }),
    {}
  );

const passports = fs
  .readFileSync("input")
  .toString()
  .split("\n\n")
  .map((rawPassport) => parsePassport(rawPassport));
const validPassportCount = passports.reduce((acc, cur) => {
  return validPassport(cur, rules) ? (acc += 1) : acc;
}, 0);
console.log(validPassportCount);
