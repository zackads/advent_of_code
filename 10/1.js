const fs = require("fs");
const adapters = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((str) => parseInt(str));

const addOutletAndDevice = (adapters) => {
  const outletJolts = 0;
  const deviceJolts = Math.max(...adapters) + 3;
  return [outletJolts, ...adapters, deviceJolts];
};

const countJoltDiffs = (adapters, diff) => {
  return adapters
    .sort((a, b) => a - b)
    .reduce((counter, adapter, index, array) => {
      if (array[index + 1] - adapter === diff) {
        return (counter += 1);
      }
      return counter;
    }, 0);
};

const product1and3JoltDiffs = (adapters) => {
  return (
    countJoltDiffs(addOutletAndDevice(adapters), 1) *
    countJoltDiffs(addOutletAndDevice(adapters), 3)
  );
};

console.log(product1and3JoltDiffs(adapters));

module.exports = {
  product1and3JoltDiffs: product1and3JoltDiffs,
};
