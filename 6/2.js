const fs = require("fs");
const groups = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n\n");

const people = (group) => group.split("\n");

const histogram = (arr) =>
  arr.reduce((acc, cur) => ({ ...acc, [cur]: (acc[cur] || 0) + 1 }), {});

const uniques = (histogram) =>
  Object.keys(histogram).filter((value) => histogram[value] >= 1);

const allChars = (strArr) => strArr.join("").split("");

const commonChars = (...strings) =>
  uniques(histogram(allChars(strings))).reduce(
    (common_chars, char) =>
      strings.every((string) => string.includes(char))
        ? [...common_chars, char]
        : common_chars,
    []
  );

const countYesAnswers = (group) => commonChars(...people(group)).length;

const sumYesAnswers = (groups) =>
  groups.reduce((sum, group) => sum + countYesAnswers(group), 0);

console.log(sumYesAnswers(groups));

module.exports = {
  histogram: histogram,
  countYesAnswers: countYesAnswers,
  commonChars: commonChars,
};
