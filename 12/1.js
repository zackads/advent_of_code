const { Ship } = require("./Ship1");

const fs = require("fs");
const actions = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const ship = new Ship();
actions.forEach((action) => {
  ship.move(action);
});

const manhattan_distance = (position) =>
  Math.abs(position.east) + Math.abs(position.north);

console.log(manhattan_distance(ship.current_position));

module.exports = {
  manhattan_distance: manhattan_distance,
};
