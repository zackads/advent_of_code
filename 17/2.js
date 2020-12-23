// With thanks to https://cestlaz.github.io/post/advent-2020-1718/

const parse = (input) => {
  const ndArray = [input.split("\n").map((line) => line.split(""))];
  let active = new Set();
  for (let z = 0; z < ndArray.length; z++) {
    for (let y = 0; y < ndArray[z].length; y++) {
      for (let x = 0; x < ndArray[z][y].length; x++) {
        for (let w = 0; w < ndArray[z][y][x].length; w++) {
          if (ndArray[z][y][x][w] === "#") active.add(`${x},${y},${z},${w}`);
        }
      }
    }
  }
  return active;
};

const fs = require("fs");
let initial_state = parse(fs.readFileSync(__dirname + "/input.txt").toString());

const neighbours = (cube) => {
  const neighbours = new Set();
  const [x, y, z, w] = cube.split(",").map((n) => parseInt(n));
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          if (`${i},${j},${k},${l}` !== cube)
            neighbours.add(`${i},${j},${k},${l}`);
        }
      }
    }
  }
  return neighbours;
};

const activeNeighbours = (cube, active) => {
  const all_neighbours = neighbours(cube);
  return new Set([...all_neighbours].filter((x) => active.has(x)));
};

const allNeighbours = (cubes) => {
  let next = new Set();
  cubes.forEach((cube) => {
    next = [...next, ...neighbours(cube)];
  });
  return next;
};

const cycle = (active) => {
  const next_state = new Set();
  const potential_next_cubes = [...allNeighbours(active), ...active];

  for (let cube of potential_next_cubes) {
    const active_neighbours = activeNeighbours(cube, active);
    if (
      active.has(cube) &&
      (active_neighbours.size === 2 || active_neighbours.size === 3)
    ) {
      next_state.add(cube);
    } else if (!active.has(cube) && active_neighbours.size === 3) {
      next_state.add(cube);
    }
  }
  return next_state;
};

let state = initial_state;
for (let i = 0; i < 6; i++) {
  state = cycle(state);
}
console.log(state.size);

module.exports = {
  parse: parse,
};
