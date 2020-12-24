// With thanks to https://isaaccs.org/c/dsa_toc_rpn

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const string2infix = (string) => {
  const re_split_on_whitespace_and_brackets = /\s|(?=\()|(?<=\()|(?=\))|(?<=\))/g;
  return string
    .split(re_split_on_whitespace_and_brackets)
    .map((token) => parseInt(token) || token);
};

const infix2postfix = (infix) => {
  // https://en.wikipedia.org/wiki/Shunting-yard_algorithm
  const input = [...infix];
  const output = []; // queue
  const operators = []; // stack

  while (input.length > 0) {
    const token = input.shift();
    if (typeof token === "number") {
      output.push(token);
    } else if (token === "+" || token === "*") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      operators.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      if (operators[operators.length - 1] === "(") {
        operators.pop();
      }
    }
  }
  if (input.length === 0) {
    while (operators.length > 0) {
      output.push(operators.pop());
    }
  }

  return output;
};

const evaluatePostfix = (postfix) => {
  const input = [...postfix];
  const values = []; // stack

  while (input.length > 0) {
    const token = input.shift();

    if (typeof token === "number") {
      values.push(token);
    } else if (token === "+") {
      values.push(values.pop() + values.pop());
    } else if (token === "*") {
      values.push(values.pop() * values.pop());
    }
  }
  return values.pop();
};

const evaluate = (expression) => {
  const infix = string2infix(expression);
  const postfix = infix2postfix(infix);
  return evaluatePostfix(postfix);
};

const answer = input.reduce((sum, line) => {
  return sum + evaluate(line);
}, 0);

console.log(answer);

module.exports = {
  evaluate: evaluate,
  infix2postfix: infix2postfix,
  string2infix: string2infix,
  evaluatePostfix: evaluatePostfix,
};
