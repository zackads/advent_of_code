const fs = require("fs");
const notes = fs.readFileSync(__dirname + "/input.txt").toString();

const errorRate = (notes) => {
  const { rules, nearby_tickets } = parse(notes);

  return nearby_tickets.reduce((sum_invalid_values, ticket) => {
    return (
      sum_invalid_values +
      invalidValues(ticket, rules).reduce((acc, cur) => acc + cur, 0)
    );
  }, 0);
};

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

  // Nasty
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
  //   Object.entries(calculatePositions(positions)).reduce((product, field) => {
  //     const [field_name, position] = field;
  //     if (field_name.slice(0, 9) === "departure") {
  //       return (product *= position);
  //     } else {
  //       return product;
  //     }
  //   }, 1)
  const departure_indexes = Object.entries(calculatePositions(positions))
    .filter((field) => {
      const [field_name, position] = field;
      return field_name.slice(0, 9) === "departure";
    })
    .map((field) => field[1]);

  console.log(
    my_ticket
      .filter((field, index) => departure_indexes.includes(index))
      .reduce((product, value) => (product = product *= value))
  );
};

// { class: [1, 2], row: [0, 1, 2], seat: [2] }
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

      if (possible_positions.length === 1) {
        confirmed_position = possible_positions[0];
        return { ...confirmed_positions, [field_name]: confirmed_position };
      }
    },
    {}
  );
  //   if (
  //     Object.keys(confirmed_positions).length === Object.keys(positions).length
  //   ) {
  return confirmed_positions;
  //   }
  //   } else {
  //     return calculatePositions(Object.fromEntries(positions_array));
  //   }
};

module.exports = {
  decodeTicket: decodeTicket,
  calculatePositions: calculatePositions,
};

decodeTicket(notes);
