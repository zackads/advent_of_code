let fs = require("fs");

const rows = fs.readFileSync("input").toString().split("\n");
const listedSlopes = [
  // [right, down]
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const isTree = (cell) => cell === "#";
const makeMountainNecessaryWidth = (row, right_magnitude) =>
  row.repeat(row.length * right_magnitude);

const countTrees = (rows, right_magnitude, down_magnitude) => {
  let x_position = 0;
  return rows
    .filter((_, i) => i % down_magnitude === 0)
    .reduce((acc, cur) => {
      let cell = makeMountainNecessaryWidth(cur, right_magnitude)[x_position];
      x_position += right_magnitude;
      return isTree(cell) ? (acc += 1) : acc;
    }, 0);
};

const productOfTreesOnListedSlopes = listedSlopes.reduce(
  (acc, cur) => (acc *= countTrees(rows, cur[0], cur[1])),
  1
);

console.log(productOfTreesOnListedSlopes);
