const fs = require("fs");

const rowData = (pass) => pass.slice(0, 7).split("");
const columnData = (pass) => pass.slice(7).split("");
const midpoint = (low, high) => (high - low + 1) / 2;
const maxPossibleDecimal = (binaryArr) => Math.pow(2, binaryArr.length);
const decimal = (binaryArr, highChar, lowChar) => {
  let [low, high] = [0, maxPossibleDecimal(binaryArr) - 1];
  binaryArr.forEach((char) => {
    if (char === highChar) high -= midpoint(low, high);
    if (char === lowChar) low += midpoint(low, high);
  });

  return low;
};
const calcSeatId = (pass) =>
  decimal(rowData(pass), "F", "B") * 8 + decimal(columnData(pass), "L", "R");

const passes = fs.readFileSync("input").toString().split("\n");
const seatIds = passes.map((pass) => calcSeatId(pass));

console.log(Math.max(...seatIds));
