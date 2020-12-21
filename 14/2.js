const fs = require("fs");
const code = fs.readFileSync(__dirname + "/input.txt").toString();

const maskAddress = (address, mask) => {
  const bin = dec2bin(address).padStart(36, "0").split("");
  const floating_indexes = [];
  const decimals = [];
  for (let i = 0; i < bin.length; i++) {
    if (mask[i] !== "0") bin[i] = mask[i];
    if (mask[i] === "X") floating_indexes.push(i);
  }
  for (let i = 0; i < Math.pow(2, floating_indexes.length); i++) {
    const values = dec2bin(i).padStart(floating_indexes.length, "0").split("");
    decimals.push(
      bin2dec(changeElements(bin, floating_indexes, values).join(""))
    );
  }
  return decimals;
};

const changeElements = (array, indexes, values) => {
  indexes.forEach((index, i) => (array[index] = values[i]));
  return array;
};

const dec2bin = (decimal) => (decimal >>> 0).toString(2);
const bin2dec = (binary) => parseInt(binary, 2);

const parse = (code) => {
  const value_regex = /(?<=\[)\d+(?=\])/;
  return code.split("\n").map((statement) => {
    statement = statement.trim();
    const operation = statement.slice(0, 3);
    if (operation === "mem") {
      return [
        "mem",
        value_regex.exec(statement)[0],
        parseInt(statement.split(" = ")[1]),
      ];
    }
    if (operation === "mas") {
      return statement.split(" = ");
    }
  });
};

const initialize = (code) => {
  const parsed_code = parse(code);
  let mask;
  let memory = {};

  parsed_code.forEach((statement) => {
    const operation = statement[0];
    if (operation === "mask") {
      mask = statement[1];
    }
    if (operation === "mem") {
      const memory_locations = maskAddress(statement[1], mask);
      const value_to_save = statement[2];
      memory_locations.forEach(
        (location) => (memory[location] = value_to_save)
      );
    }
  });
  return memory;
};

const sum = (memory) =>
  Object.values(memory).reduce((acc, cur) => (acc += cur), 0);

console.log(sum(initialize(code)));

module.exports = {
  maskAddress: maskAddress,
  dec2bin: dec2bin,
  initialize: initialize,
  parse: parse,
  maskAddress: maskAddress,
};
