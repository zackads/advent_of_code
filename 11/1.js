var fs = require("fs");

const SEAT_OCCUPIED = "#";
const SEAT_EMPTY = "L";
const FLOOR = ".";

const layout = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(""));

const applyRules = (layout) => {
  return layout.map((row, row_index) =>
    row.map((seat, seat_index) => {
      const adjacent_seats = adjacents(layout, seat_index, row_index);
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

const adjacents = (layout, seat_index, row_index) => {
  const adjacents = [];
  if (layout[row_index - 1]) {
    adjacents.push(layout[row_index - 1][seat_index - 1] || null);
    adjacents.push(layout[row_index - 1][seat_index] || null);
    adjacents.push(layout[row_index - 1][seat_index + 1] || null);
  }
  if (layout[row_index + 1]) {
    adjacents.push(layout[row_index + 1][seat_index + 1] || null);
    adjacents.push(layout[row_index + 1][seat_index] || null);
    adjacents.push(layout[row_index + 1][seat_index - 1] || null);
  }
  adjacents.push(layout[row_index][seat_index + 1] || null);
  adjacents.push(layout[row_index][seat_index - 1] || null);
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
