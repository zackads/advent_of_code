// With thanks to https://www.reddit.com/r/adventofcode/comments/kjy0pp/day_20_walkthrough_for_those_who_are_stuck/

const fs = require("fs");
const squares = fs
  .readFileSync(__dirname + "/test_input.txt")
  .toString()
  .split("\n\n")
  .reduce((map, tile) => {
    [id, tile] = tile.split(":\n");
    return {
      ...map,
      [id.split(" ")[1]]: tile.split("\n").map((line) => line.split("")),
    };
  }, {});

const rotate90 = (square) => {
  return square[0].map((val, index) =>
    square.map((row) => row[index]).reverse()
  );
};

const flip = (square) => square.map((line) => [...line].reverse());

const permutations = (tile) => {
  return [
    tile,
    rotate90(tile),
    rotate90(rotate90(tile)),
    rotate90(rotate90(rotate90(tile))),
    flip(tile),
    flip(rotate90(tile)),
    flip(rotate90(rotate90(tile))),
    flip(rotate90(rotate90(rotate90(tile)))),
  ];
};

const neighbours = (tiles) => {
  const iterable_tiles = Object.entries(tiles);
  const neighbours = {};

  iterable_tiles.forEach(([tile1_id, tile1_body], index1) => {
    neighbours[tile1_id] = new Set();
    iterable_tiles.forEach(([tile2_id, tile2_body], index2) => {
      if (index1 !== index2 && isNeighbour(tile1_body, tile2_body)) {
        neighbours[tile1_id].add(tile2_id);
      }
    });
  });

  return neighbours;
};

const isNeighbour = (tile1, tile2) => {
  const permutations1 = permutations(tile1);
  const permutations2 = permutations(tile2);

  for (let i = 0; i < permutations1.length; i++) {
    for (let j = 0; j < permutations2.length; j++) {
      if (
        isEqual(
          permutations1[i][0],
          permutations2[j][permutations2[j].length - 1]
        ) ||
        isEqual(
          permutations1[i][permutations1[j].length - 1],
          permutations2[j][0]
        ) ||
        verticalLeft(permutations1[i]) === verticalRight(permutations2[j]) ||
        verticalRight(permutations1[j]) === verticalLeft(permutations1[i])
      )
        return true;
    }
  }
  return false;
};

const verticalLeft = (tile) => tile.map((row) => row[0]);
const verticalRight = (tile) => tile.map((row) => row.slice(-1));
const isEqual = (array1, array2) =>
  JSON.stringify(array1) === JSON.stringify(array2);

const corners = (squares) => {
  const adjacency_list = neighbours(squares);
  return Object.keys(adjacency_list).filter(
    (tile_id) => adjacency_list[tile_id].size === 2
  );
};

const generateImage = (squares) => {
  const adjacency_list = neighbours(squares);
  const side_length = Math.sqrt(Object.keys(squares).length);
  const rows = [];

  for (let i = 0; i < side_length; i++) {
    const row = [];
    while (row.length < side_length) {
      if (row.length === 0) {
        // This is the first row
        if (i === 0) {
          // This is first square to go into first row
          const [corner_square_id, corner_square_body] = Object.entries(
            adjacency_list
          ).filter(
            ([square_id, square_body]) => adjacency_list[square_id].size === 2
          )[0];
          row.push(corner_square_id);
        } else {
          // This is the first square to go into another row
          const starting_square_of_previous_row = rows[i - 1][0];
          const starting_square_of_previous_row_neighbours =
            adjacency_list[starting_square_of_previous_row];

          const first_square_in_middle_row = [
            ...starting_square_of_previous_row_neighbours,
          ].filter((square) => !rows.flat().includes(square))[0];
          row.push(first_square_in_middle_row);
        }
      } else {
        const last_square_neighbours = adjacency_list[row[row.length - 1]];
        if (last_square_neighbours.size === 2) {
          if (i === 0) {
            // This is the second square of the first row
            const next_square_id = adjacency_list[row[i]].values().next().value;
            row.push(next_square_id);
          } else {
            // This is the second square of the last row
            const previous_corner_square_id = row[0];
            const starting_square_of_previous_row = rows[i - 1][0];
            const next_square_id = [
              ...adjacency_list[previous_corner_square_id],
            ].filter(
              (square_id) => square_id !== starting_square_of_previous_row
            );
            row.push(next_square_id);
          }
        } else if (last_square_neighbours.size === 3) {
          if (i === 0 || i === side_length - 1) {
            // First or last row
            // Pick the other neighbor that also does not have four neighbors of their own and is not the previous, previous tile,
            const previous_square = row[row.length - 1];
            const previous_square_neighbours = adjacency_list[previous_square];
            const previous_previous_square = row[row.length - 2];

            const next_square = [...previous_square_neighbours].filter(
              (square_id) =>
                square_id !== previous_previous_square &&
                adjacency_list[square_id].size !== 4
            )[0];

            row.push(next_square);
          } else {
            // This is the edge of a middle row, pick the neighbour
          }
        }
      }
    }
    rows.push(row);
    console.log(row.length);
  }
};

generateImage(squares);

module.exports = {
  permutations: permutations,
  isNeighbour: isNeighbour,
  rotate90: rotate90,
  flip: flip,
};
