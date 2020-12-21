const fs = require("fs");
const code = fs.readFileSync(__dirname + "/input.txt").toString();

const maskAddress = (address, mask) => {
  const bin = dec2bin(address).padStart(36, "0").split("");
  const floating_indexes = [];
  const dec = [];
  for (let i = 0; i < bin.length; i++) {
    if (mask[i] !== "0") bin[i] = mask[i];
    if (mask[i] === "X") floating_indexes.push(i);
  }
  for (let i = 0; i < Math.pow(2, floating_indexes.length); i++) {
    const values = dec2bin(i).padStart(floating_indexes.length, "0").split("");
    dec.push(bin2dec(changeElements(bin, floating_indexes, values).join("")));
  }
  return dec;
};

const changeElements = (array, indexes, values) => {
  const copy = [...array];
  indexes.forEach((index, i) => (copy[index] = values[i]));
  return copy;
};

const dec2bin = (decimal) => (decimal >>> 0).toString(2);
const bin2dec = (binary) => parseInt(binary, 2);

const parse = (code) => {
  const value_regex = /(?<=\[)\d+(?=\])/;
  return code.split("\n").map((statement) => {
    const operation = statement.trim().slice(0, 3);
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
  let sum = 0;

  parsed_code.forEach((statement) => {
    const operation = statement[0].trim();
    if (operation === "mask") {
      mask = statement[1];
    }
    if (operation === "mem") {
      const memory_locations = maskAddress(statement[1], mask);
      const value_to_save = statement[2];
      memory_locations.forEach((location) => {
        memory[location] = value_to_save;
        console.log(memory);
        sum += value_to_save;
      });
    }
  });
  console.log(sum);
  return memory;
};

const sum = (memory) =>
  Object.values(memory).reduce((acc, cur) => (acc += cur), 0);

// initialize(code);

module.exports = {
  maskAddress: maskAddress,
  dec2bin: dec2bin,
  initialize: initialize,
  parse: parse,
  maskAddress: maskAddress,
};
