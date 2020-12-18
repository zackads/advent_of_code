var fs = require("fs");
const { maxHeaderSize } = require("http");

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
const hasFiveVisibleOccupiedSeats = (ferry, row_index, seat_index) => {
  return visibleOccupiedSeats(ferry, row_index, seat_index) >= 5;
};
const hasNoVisibleOccupiedSeats = (ferry, row_index, seat_index) =>
  visibleOccupiedSeats(ferry, row_index, seat_index) === 0;

const applyRules = (ferry) => {
  return ferry.map((row, row_index) =>
    row.map((seat, seat_index) => {
      if (
        isOccupied(ferry, row_index, seat_index) &&
        hasFiveVisibleOccupiedSeats(ferry, row_index, seat_index)
      )
        return SEAT_EMPTY;
      if (
        isEmpty(ferry, row_index, seat_index) &&
        hasNoVisibleOccupiedSeats(ferry, row_index, seat_index)
      )
        return SEAT_OCCUPIED;
      return seat;
    })
  );
};

const visibleOccupiedSeats = (ferry, row_index, col_index) => {
  let counter = 0;

  // Horizontal
  // Left
  let hasHorizontalL = false;
  for (let col = col_index - 1; col >= 0; col -= 1) {
    if (ferry[row_index][col] === SEAT_EMPTY) hasHorizontalL = true;
    if (ferry[row_index][col] === SEAT_OCCUPIED && !hasHorizontalL) {
      hasHorizontalL = true;
      counter += 1;
    }
  }
  // Right
  let hasHorizontalR = false;
  for (let col = col_index + 1; col < ferry[0].length; col += 1) {
    if (ferry[row_index][col] === SEAT_EMPTY) hasHorizontalR = true;
    if (ferry[row_index][col] === SEAT_OCCUPIED && !hasHorizontalR) {
      hasHorizontalR = true;
      counter += 1;
    }
  }

  // Vertical
  hasVerticalU = false;
  hasVerticalD = false;
  for (let row = row_index - 1; row >= 0; row -= 1) {
    // Up
    if (ferry[row][col_index] === SEAT_EMPTY) hasVerticalU = true;
    if (ferry[row][col_index] === SEAT_OCCUPIED && !hasVerticalU) {
      hasVerticalU = true;
      counter += 1;
    }
  }
  for (let row = row_index + 1; row <= ferry.length - 1; row += 1) {
    // Down
    if (ferry[row][col_index] === SEAT_EMPTY) hasVerticalD = true;
    if (ferry[row][col_index] === SEAT_OCCUPIED && !hasVerticalD) {
      hasVerticalD = true;
      counter += 1;
    }
  }

  // Diagonal up
  let diagonal_l = col_index;
  let diagonal_r = col_index;
  let hasDiagonalL = false;
  let hasDiagonalR = false;
  for (let row = row_index - 1; row >= 0; row -= 1) {
    diagonal_l -= 1;
    diagonal_r += 1;
    if (ferry[row][diagonal_l] === SEAT_EMPTY) hasDiagonalL = true;
    if (ferry[row][diagonal_r] === SEAT_EMPTY) hasDiagonalR = true;
    if (ferry[row][diagonal_l] === SEAT_OCCUPIED && !hasDiagonalL) {
      counter += 1;
      hasDiagonalL = true;
    }
    if (ferry[row][diagonal_r] === SEAT_OCCUPIED && !hasDiagonalR) {
      counter += 1;
      hasDiagonalR = true;
    }
  }

  // Diagonal down
  diagonal_l = col_index;
  diagonal_r = col_index;
  hasDiagonalL = false;
  hasDiagonalR = false;
  for (let row = row_index + 1; row <= ferry.length - 1; row += 1) {
    diagonal_l -= 1;
    diagonal_r += 1;
    if (ferry[row][diagonal_l] === SEAT_EMPTY) hasDiagonalL = true;
    if (ferry[row][diagonal_r] === SEAT_EMPTY) hasDiagonalR = true;
    if (ferry[row][diagonal_l] === SEAT_OCCUPIED && !hasDiagonalL) {
      counter += 1;
      hasDiagonalL = true;
    }
    if (ferry[row][diagonal_r] === SEAT_OCCUPIED && !hasDiagonalR) {
      counter += 1;
      hasDiagonalR = true;
    }
  }

  return counter;
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

const countOccupiedSeats = (ferry) =>
  ferry.flat().filter((seat) => seat === SEAT_OCCUPIED).length;

console.log(countOccupiedSeats(repeatUntilStatic(ferry)));

module.exports = {
  applyRules: applyRules,
  repeatUntilStatic: repeatUntilStatic,
  visibleOccupiedSeats: visibleOccupiedSeats,
};
