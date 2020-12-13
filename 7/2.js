const fs = require("fs");
const rules = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const parseRule = (rule) => {
  // "plaid beige bags contain 3 drab magenta bags" => { "plaid beige": [[3, "drab magenta"]] }
  const outer_bag = rule.split(" bags contain ")[0];
  const inner_bags = rule
    .split(" bags contain ")[1]
    .split(", ")
    .reduce((bags, cur) => {
      return cur.includes("no other bags")
        ? []
        : [
            ...bags,
            [
              parseInt(cur.split(" ")[0]),
              `${cur.split(" ")[1]} ${cur.split(" ")[2]}`,
            ],
          ];
    }, []);
  return { [outer_bag]: inner_bags };
};

const makeGraph = (rules) => {
  const graph = {};
  rules.forEach((rule) => Object.assign(graph, parseRule(rule)));
  return graph;
};

const countBags = (bag, graph) => {
  let counter = 0;
  graph[bag].forEach((inner_bag) => {
    if (graph[inner_bag[1]].length == 0) {
      counter += inner_bag[0];
    } else {
      counter += inner_bag[0] + inner_bag[0] * countBags(inner_bag[1], graph);
    }
  });
  return counter;
};

console.log(countBags("shiny gold", makeGraph(rules)));

module.exports = {
  parseRule: parseRule,
  countBags: countBags,
};
