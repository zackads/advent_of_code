let fs = require("fs");

const rows = fs.readFileSync("input").toString().split("\n");

let treeCount = 0;
let currentIndex = 0;
rows.forEach((r) => {
  let cell = r.repeat(300)[currentIndex];

  if (cell === "#") {
    treeCount += 1;
  }

  currentIndex += 3;
});

console.log(treeCount);
