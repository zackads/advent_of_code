class Game {
  constructor(instructions) {
    this.accumulator = 0;
    this.currentIndex = 0;
    this.instructions = instructions;
  }

  play() {
    while (this.currentIndex < this.instructions.length) {
      if (this.current().executed_times === 1) {
        return false;
      }
      this.execute();
    }
    return true;
  }

  execute() {
    this.current().executed_times += 1;
    switch (this.current().operation) {
      case "nop":
        this.move(1);
        break;
      case "acc":
        this.accumulator += this.current().magnitude;
        this.move(1);
        break;
      case "jmp":
        this.move(this.current().magnitude);
        break;
    }
  }

  current() {
    return this.instructions[this.currentIndex];
  }

  move(steps) {
    if (this.currentIndex + steps <= this.instructions.length) {
      this.currentIndex += steps;
    }
  }
}

const parse = (rawInstructions) => {
  return rawInstructions.map((rawInstruction) => {
    const operation = rawInstruction.split(" ")[0];
    const magnitude = parseInt(rawInstruction.split(" ")[1]);
    return { operation: operation, magnitude: magnitude, executed_times: 0 };
  });
};

const fs = require("fs");
const instructions = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const switchNopJmp = (instructions, index) => {
  if (instructions[index].operation === "jmp") {
    instructions[index].operation = "nop";
  } else {
    instructions[index].operation = "jmp";
  }
};

for (let i = 0; i < instructions.length; i++) {
  const parsedInstructions = parse(instructions);
  if (parsedInstructions[i].operation === "acc") continue;

  switchNopJmp(parsedInstructions, i);

  const game = new Game(parsedInstructions);
  if (game.play()) console.log(game.accumulator);

  switchNopJmp(parsedInstructions, i);
}

module.exports = {
  Game: Game,
};
