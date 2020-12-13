const fs = require("fs");
const rules = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const parseRule = (rule) => {
  // "plaid beige bags contain 3 drab magenta bags" => { "plaid beige": ["drab magenta"] }
  const outer_bag = rule.split(" bags contain ")[0];
  const inner_bags = rule
    .split(" bags contain ")[1]
    .split(", ")
    .reduce((bags, cur) => {
      return cur.includes("no other bags")
        ? []
        : [...bags, `${cur.split(" ")[1]} ${cur.split(" ")[2]}`];
    }, []);
  return { [outer_bag]: inner_bags };
};

const makeGraph = (rules) => {
  const graph = {};
  rules.forEach((rule) => Object.assign(graph, parseRule(rule)));
  return graph;
};

const countShinyGoldBags = (graph) => {
  const outer_bags = Object.keys(graph);
  return outer_bags.reduce((count, bag) => {
    return includesShinyGoldBag(bag, graph) ? (count += 1) : count;
  }, 0);
};

const includesShinyGoldBag = (bag, graph) =>
  graph[bag].includes("shiny gold") ||
  graph[bag].some((bag) => includesShinyGoldBag(bag, graph));

console.log(countShinyGoldBags(makeGraph(rules)));

module.exports = {
  parseRule: parseRule,
  countShinyGoldBags: countShinyGoldBags,
};
