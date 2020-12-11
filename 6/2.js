const fs = require("fs");
const group_answers = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n\n");

const countGroup = (group) => {
  const people = group.split("\n");
  return common(...people).length;
};

const histogram = (arr) => {
  return arr.reduce((acc, cur) => ({ ...acc, [cur]: (acc[cur] || 0) + 1 }), {});
};

const uniques = (histogramObj) => {
  return Object.keys(histogramObj).filter((value) => histogramObj[value] >= 1);
};

const common = (...strings) => {
  let all_chars = uniques(histogram(strings.join("").split("")));
  let common_chars = [];
  all_chars.forEach((char) => {
    if (strings.every((string) => string.includes(char))) {
      common_chars.push(char);
    }
  });
  return common_chars;
};

console.log(group_answers.reduce((acc, cur) => acc + countGroup(cur), 0));

module.exports = {
  histogram: histogram,
  countGroup: countGroup,
  common: common,
};
