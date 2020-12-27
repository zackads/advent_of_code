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

const print = (square) => {
  console.log(square.map((line) => line.join("")).join("\n"));
};

const flip = (square) => square.map((line) => [...line].reverse());

const permutations = (tile) => {
  const permutations = [
    tile,
    rotate90(tile),
    rotate90(rotate90(tile)),
    rotate90(rotate90(rotate90(tile))),
    flip(tile),
    flip(rotate90(tile)),
    flip(rotate90(rotate90(tile))),
    flip(rotate90(rotate90(rotate90(tile)))),
  ];

  return permutations;
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

const productOfCornerTiles = (corners) =>
  corners.reduce((product, tile_id) => (product *= parseInt(tile_id)));

console.log(productOfCornerTiles(corners(squares)));

module.exports = {
  permutations: permutations,
  isNeighbour: isNeighbour,
  rotate90: rotate90,
  flip: flip,
};
