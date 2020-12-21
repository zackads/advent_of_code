const fs = require("fs");
const code = fs.readFileSync(__dirname + "/input.txt").toString();

const applyMask = (mask, value) => {
  const bin = dec2bin(value).split("");
  for (let i = 0; i < bin.length; i++) {
    if (mask[i] === "1" || mask[i] === "0") {
      bin[i] = mask[i];
    }
  }
  return bin2dec(bin.join(""));
};

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

const dec2bin = (decimal) => (decimal >>> 0).toString(2).padStart(36, "0");
const bin2dec = (binary) => parseInt(binary, 2);

const initialize = (code) => {
  const parsed_code = parse(code);
  let mask;
  let memory;

  parsed_code.forEach((statement) => {
    const operation = statement[0];
    if (operation === "mask") {
      mask = statement[1];
    }
    if (operation === "mem") {
      const memory_location = statement[1];
      const value_to_save = applyMask(mask, statement[2]);
      memory = { ...memory, [memory_location]: value_to_save };
    }
  });

  return memory;
};

const sum = (memory) =>
  Object.values(memory).reduce((acc, cur) => (acc += cur), 0);

console.log(sum(initialize(code)));

module.exports = {
  applyMask: applyMask,
  dec2bin: dec2bin,
  initialize: initialize,
  parse: parse,
};
