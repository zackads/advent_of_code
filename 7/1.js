const parseRule = (rule) => {
  const top_level_bag = rule.split(" bags contain ")[0];
  const remaining_bags = rule
    .split(" bags contain ")[1]
    .split(", ")
    .reduce(
      (bags, cur) =>
        cur === "no other bags" ? bags : [...bags, parseBag(cur)],
      []
    );
  return [top_level_bag, ...remaining_bags];
};

const parseBag = (bag) => `${bag.split(" ")[1]} ${bag.split(" ")[2]}`;

const defineBags = (bags) => {
  const top_level_bag = bags[0];
  const remaining_bags = bags.slice(1).map((bag) => ({ [bag]: [] }));
  return { [top_level_bag]: remaining_bags };
};

const bagTree = (definedBags) => {
  // Not happy with this. Plan to refactor.
  let newDefinedBags = definedBags.slice();
  newDefinedBags.forEach((bag1) => {
    newDefinedBags.forEach((bag2) => {
      bag1.forEach((bag3) => {
        if (bag3 === bag2[0]) {
          bag1.push(...bag2.slice(1));
        }
      });
    });
  });

  return newDefinedBags.map((arr) => [...new Set(arr)]);
};

module.exports = {
  parseRule: parseRule,
  defineBags: defineBags,
  bagTree: bagTree,
};
