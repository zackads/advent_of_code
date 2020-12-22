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
  notes = notes.split("\n");

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

  const nearby_tickets = notes
    .slice(notes.indexOf("nearby tickets:") + 1)
    .map((ticket) => ticket.split(",").map((num) => parseInt(num)));

  return { rules: rules, nearby_tickets: nearby_tickets };
};

console.log(errorRate(notes));

module.exports = {
  parse: parse,
  errorRate: errorRate,
  invalidValues: invalidValues,
};
