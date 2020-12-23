const fs = require("fs");
const notes = fs.readFileSync(__dirname + "/input.txt").toString();

const invalidValues = (ticket, rules) => {
  const invalid_values = [];
  ticket.forEach((field) => {
    if (
      !rules.some((rule) => {
        return (
          (rule.range1[0] <= field && field <= rule.range1[1]) ||
          (rule.range2[0] <= field && field <= rule.range2[1])
        );
      })
    ) {
      invalid_values.push(field);
    }
  });
  return invalid_values;
};

const parse = (notes) => {
  notes = notes.split("\n").map((line) => line.trim());

  const rules = notes.slice(0, notes.indexOf("")).map((rule) => {
    return {
      category: rule.slice(0, rule.indexOf(":")),
      range1: rule
        .match(/\d+-\d+/g)[0]
        .split("-")
        .map((num) => parseInt(num)),
      range2: rule
        .match(/\d+-\d+/g)[1]
        .split("-")
        .map((num) => parseInt(num)),
    };
  });

  const my_ticket = notes[notes.indexOf("your ticket:") + 1]
    .split(",")
    .map((num) => parseInt(num));

  const nearby_tickets = notes
    .slice(notes.indexOf("nearby tickets:") + 1)
    .map((ticket) => ticket.split(",").map((num) => parseInt(num)));

  return { rules: rules, my_ticket: my_ticket, nearby_tickets: nearby_tickets };
};

const decodeTicket = (notes) => {
  const { rules, my_ticket, nearby_tickets } = parse(notes);
  const valid_tickets = nearby_tickets.filter(
    (ticket) => invalidValues(ticket, rules).length === 0
  );
  const fields = valid_tickets[0].map((val, index) =>
    valid_tickets.map((row) => row[index]).reverse()
  );
  const positions = {};

  rules.forEach((rule) => {
    positions[rule.category] = [];
    fields.forEach((field, index) => {
      if (
        field.every(
          (value) =>
            (rule.range1[0] <= value && value <= rule.range1[1]) ||
            (rule.range2[0] <= value && value <= rule.range2[1])
        )
      ) {
        positions[rule.category].push(index);
      }
    });
  });

  const departure_indexes = Object.entries(calculatePositions(positions))
    .filter((field) => field[0].slice(0, 9) === "departure")
    .map((field) => field[1]);

  return my_ticket
    .filter((field, index) => departure_indexes.includes(index))
    .reduce((product, value) => (product = product *= value));
};

const calculatePositions = (positions) => {
  let positions_array = Object.entries(positions).sort(
    (a, b) => a[1].length - b[1].length
  );

  const confirmed_positions = positions_array.reduce(
    (confirmed_positions, field) => {
      let [field_name, possible_positions] = field;
      possible_positions = possible_positions.filter((possible_position) => {
        return !Object.values(confirmed_positions).includes(possible_position);
      });

      confirmed_position = possible_positions[0];
      return { ...confirmed_positions, [field_name]: confirmed_position };
    },
    {}
  );
  return confirmed_positions;
};

module.exports = {
  decodeTicket: decodeTicket,
  calculatePositions: calculatePositions,
};

console.log(decodeTicket(notes));
