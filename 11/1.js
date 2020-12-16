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

const applyRules = (layout) => {
  return layout.map((row, row_index) =>
    row.map((seat, seat_index) => {
      const adjacent_seats = adjacentSeats(layout, seat_index, row_index);
      if (seat === SEAT_EMPTY && !adjacent_seats.includes(SEAT_OCCUPIED))
        return SEAT_OCCUPIED;
      if (
        seat === SEAT_OCCUPIED &&
        adjacent_seats.filter((seat) => seat === SEAT_OCCUPIED).length >= 4
      )
        return SEAT_EMPTY;
      return seat;
    })
  );
};

const parse = (seatLayoutString) =>
  seatLayoutString.split("\n").map((line) => line.split(""));

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

// console.log(
//   JSON.stringify(
//     applyRules(
//       parse(`#.##.##.##
//   #######.##
//   #.#.#..#..`)
//     )
//   )
// );

module.exports = {
  applyRules: applyRules,
};
