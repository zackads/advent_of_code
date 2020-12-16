const fs = require("fs");

const rowData = (boarding_pass) => boarding_pass.slice(0, 7).split("");
const columnData = (boarding_pass) => boarding_pass.slice(7).split("");

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

const calcSeatId = (boarding_pass) =>
  decimal(rowData(boarding_pass), "F", "B") * 8 +
  decimal(columnData(boarding_pass), "L", "R");

const passes = fs.readFileSync("input").toString().split("\n");
const seatIds = passes.map((boarding_pass) => calcSeatId(boarding_pass));

console.log(Math.max(...seatIds));
