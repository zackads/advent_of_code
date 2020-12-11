const fs = require("fs");
const group_answers = fs.readFileSync("input.txt").toString().split("\n\n");

const group_counts = group_answers.map(
  (group_answer) =>
    [...new Set(group_answer.replace(/\s/g, "").split(""))].length
);

const sum_group_counts = group_counts.reduce((acc, cur) => acc + cur, 0);

console.log(sum_group_counts);
