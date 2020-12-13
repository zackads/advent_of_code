const fs = require("fs");
const rules = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const kvRegex = /(.+) bags contain (.+)\./;
const ruleRegex = /(\d+) ([a-z]+ [a-z]+) bags?/;

const parseRule = (r) => {
  const [_full, key, value] = r.match(kvRegex);

  return [
    key,
    value.split(", ").reduce((acc, rule) => {
      const match = rule.match(ruleRegex);
      if (match) {
        // there is no match if it's "no other bags", in that case no rules are added.
        const [_full, count, color] = match;
        acc.push([parseInt(count), color]); // e.g. [4, "bright white"]
      }
      return acc;
    }, []),
  ];
};

// const parseRule = (rule) => {
//   const top_level_bag = rule.split(" bags contain ")[0];
//   const remaining_bags = rule
//     .split(" bags contain ")[1]
//     .split(", ")
//     .reduce(
//       (bags, cur) =>
//         cur === "no other bags" ? bags : [...bags, parseBag(cur)],
//       []
//     );
//   return [top_level_bag, ...remaining_bags];
// };

const parseBag = (bag) => `${bag.split(" ")[1]} ${bag.split(" ")[2]}`;

const containsGold = (map, cur, resultSet) => {
  return map.get(cur).some((rule) => {
    if (
      rule[1] === "shiny gold" ||
      resultSet.has(rule[1]) ||
      containsGold(map, rule[1], resultSet)
    ) {
      counter += 1;
      return true;
    }
    return false;
  });
};

const solvePartOne = () => {
  console.log(rules.map(parseRule));
  const map = new Map(rules.map(parseRule));

  const counter = 0;
  map.forEach((val, key) => containsGold(map, key, counter));

  return counter;
};

console.log(solvePartOne());

module.exports = {
  parseRule: parseRule,
};
