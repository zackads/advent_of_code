// Exactly the same as part 1
// Just change the new rules from "8: 42 | 42 8" to "8: 42 | 42 42 | 42 42 42 | 42 42 42 42 | 42 42 42 42 42"
// and "11: 42 31 | 42 11 31" to " 11: 42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31
// Courtesy of https://www.reddit.com/r/adventofcode/comments/kh0yiw/2020_day_19_part_2_took_me_two_days_to_figure_out/

const fs = require("fs");
const [rules, messages] = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n\n")
  .map((strings) => strings.split("\n"));

const parse = (rules) => {
  return rules.reduce((parsed_rules, raw_rule) => {
    const [key, value] = raw_rule.split(": ");
    if (value[0] === '"') {
      // Terminal
      parsed_rules[key] = value.slice(1, -1);
    } else if (value.includes("|")) {
      // Alternative
      parsed_rules[key] = value
        .split(" | ")
        .map((sub_value) => sub_value.split(" "));
    } else {
      // Sequence
      parsed_rules[key] = value.split(" ");
    }
    return parsed_rules;
  }, {});
};

const expand = (value, all_rules) => {
  if (typeof value === "string") {
    // Terminal e.g. "a"
    return value;
  } else if (typeof value === "object" && typeof value[0] === "object") {
    // Alternative e.g. [[1,3], [3,1]] or [["a", "b"], ["b", "a"]]
    return (
      "(" + value.map((sub_rule) => expand(sub_rule, all_rules)).join("|") + ")"
    );
  } else {
    // Sequence e.g. [1, 2] or ["a", "b"]
    return value
      .map((sub_rule) => expand(all_rules[sub_rule], all_rules))
      .join("");
  }
};

const validate = (message, rules) => {
  const rule = RegExp("^" + expand(rules[0], rules) + "$");
  return rule.test(message);
};

const numberOfValidMessages = (messages, rules) => {
  return messages.reduce((count, current_message) => {
    return validate(current_message, rules) ? (count += 1) : count;
  }, 0);
};

console.log(numberOfValidMessages(messages, parse(rules)));
