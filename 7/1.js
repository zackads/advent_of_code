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
      return cur.includes("no other bags") ? [] : [...bags, parseBag(cur)];
    }, []);
  return { [outer_bag]: inner_bags };
};

const parseBag = (bag) => `${bag.split(" ")[1]} ${bag.split(" ")[2]}`;

class Queue {
  constructor() {
    this.elements = [];
  }

  enqueue(...elements) {
    elements.forEach((e) => this.elements.push(e));
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  peek() {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }

  length() {
    return this.elements.length;
  }
}

/*
Be sure to parse the input into some data structure where you can easily 
query the contents of a bag by its name. It's not necessary, but recursion
might be the best way to start to unwrap this one; any bag _contains 
the shiny gold one_ if 1) the shiny gold bag is directly in 
its contents, or 2) one of the bags in its contents _contains the shiny 
gold one_.
*/

const graph = {};
rules.forEach((rule) => Object.assign(graph, parseRule(rule)));

let checked = [];
const containsShinyGold = (bag) => {
  let counter = 0;
  console.log(checked);
  if (!checked.includes(graph[bag])) {
    if (graph[bag].includes("shiny gold")) {
      counter += 1;
      checked.push(bag);
    } else {
      counter += graph[bag].reduce(
        (count, bag) => (count += containsShinyGold(bag)),
        0
      );
    }
  }
  return counter;
};

const countShinyGoldBags = (graph) => {
  const outer_bags = Object.keys(graph);
  counter = 0;
  outer_bags.forEach((bag) => {
    if (
      graph[bag].includes("shiny gold") ||
      includesShinyGoldBag(graph, graph[bag])
    ) {
      counter += 1;
    }
  });
  return counter;
};

const includesShinyGoldBag = (graph, outer_bags) => {
  let contains = false;
  outer_bags.forEach((bag) => {
    if (
      graph[bag].includes("shiny gold") ||
      includesShinyGoldBag(graph, graph[bag])
    ) {
      contains = true;
    }
  });
  return contains;
};

console.log(countShinyGoldBags(graph));

module.exports = {
  parseRule: parseRule,
  countShinyGoldBags: countShinyGoldBags,
};
