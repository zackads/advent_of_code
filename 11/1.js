var fs = require("fs");

const SEAT_OCCUPIED = "#";
const SEAT_EMPTY = "L";
const FLOOR = ".";

const ferry = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(""));

// Functions to determine state of seat
const isEmpty = (ferry, row_index, seat_index) =>
  ferry[row_index][seat_index] === SEAT_EMPTY;
const isOccupied = (ferry, row_index, seat_index) =>
  ferry[row_index][seat_index] === SEAT_OCCUPIED;
const hasFourAdjacentOccupiedSeats = (ferry, row_index, seat_index) =>
  adjacentSeats(ferry, seat_index, row_index).filter(
    (seat) => seat === SEAT_OCCUPIED
  ).length >= 4;
const hasNoAdjacentOccupiedSeats = (ferry, row_index, seat_index) =>
  !adjacentSeats(ferry, seat_index, row_index).includes(SEAT_OCCUPIED);

const applyRules = (ferry) => {
  return ferry.map((row, row_index) =>
    row.map((seat, seat_index) => {
      if (
        isEmpty(ferry, row_index, seat_index) &&
        hasNoAdjacentOccupiedSeats(ferry, row_index, seat_index)
      )
        return SEAT_OCCUPIED;
      if (
        isOccupied(ferry, row_index, seat_index) &&
        hasFourAdjacentOccupiedSeats(ferry, row_index, seat_index)
      )
        return SEAT_EMPTY;
      return seat;
    })
  );
};

const adjacentSeats = (ferry, seat_index, row_index) => {
  const adjacents = [];
  if (ferry[row_index - 1]) {
    adjacents.push(ferry[row_index - 1][seat_index - 1] || null);
    adjacents.push(ferry[row_index - 1][seat_index] || null);
    adjacents.push(ferry[row_index - 1][seat_index + 1] || null);
  }
  if (ferry[row_index + 1]) {
    adjacents.push(ferry[row_index + 1][seat_index + 1] || null);
    adjacents.push(ferry[row_index + 1][seat_index] || null);
    adjacents.push(ferry[row_index + 1][seat_index - 1] || null);
  }
  adjacents.push(ferry[row_index][seat_index + 1] || null);
  adjacents.push(ferry[row_index][seat_index - 1] || null);
  return adjacents;
};

const repeatUntilStatic = (ferry) => {
  let ferry_before = ferry;
  let ferry_after = applyRules(ferry_before);

  do {
    ferry_before = ferry_after;
    ferry_after = applyRules(ferry_before);
  } while (JSON.stringify(ferry_before) !== JSON.stringify(ferry_after));
  return ferry_after;
};

const occupiedSeats = (ferry) =>
  ferry.flat().filter((seat) => seat === SEAT_OCCUPIED).length;

console.log(occupiedSeats(repeatUntilStatic(ferry)));

module.exports = {
  applyRules: applyRules,
  repeatUntilStatic: repeatUntilStatic,
};
