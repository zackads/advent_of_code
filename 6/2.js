const fs = require("fs");
const path = require("path");
console.log(path.dirname(require.main.filename));
const group_answers = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n\n");

const countGroup = (group) => {
  if (group.includes("\n")) return 0;
  return group.length;
};

const histogram = (arr) => {
  return arr.reduce((acc, cur) => ({ ...acc, [cur]: (acc[cur] || 0) + 1 }), {});
};

const duplicates = (histogramObj) => {
  return Object.keys(histogramObj).filter((value) => histogramObj[value] > 1);
};

module.exports = {
  histogram: histogram,
  duplicates: duplicates,
  countGroup: countGroup,
};
