let fs = require("fs");

const rows = fs.readFileSync("input").toString().split("\n");
const row_length = rows[0].length;
const horizontal_movement = 3;

let x_position = 0;
const treeCount = rows.reduce((acc, cur) => {
  let cell = cur.repeat(row_length * horizontal_movement)[x_position];
  x_position += 3;
  return cell === "#" ? (acc += 1) : acc;
}, 0);

console.log(treeCount);
