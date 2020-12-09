let fs = require("fs");

const rows = fs.readFileSync("input").toString().split("\n");

let currentIndex = 0;
const treeCount = rows.reduce((acc, cur) => {
  let cell = cur.repeat(300)[currentIndex];
  currentIndex += 3;

  return cell === "#" ? (acc += 1) : acc;
}, 0);

console.log(treeCount);
