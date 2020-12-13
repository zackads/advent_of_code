const fs = require("fs");

const instructions = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((rawInstruction) => {
    const operation = rawInstruction.split(" ")[0];
    const magnitude = parseInt(rawInstruction.split(" ")[1]);
    return { operation: operation, magnitude: magnitude };
  });

class Game {
  constructor(instructions) {
    this.accumulator = 0;
    this.currentIndex = 0;
    this.instructions = instructions;
    this.visited = [];
  }

  play() {
    while (this.currentIndex < this.instructions.length) {
      if (this.visited.includes(this.current())) {
        return false;
      }
      this.execute();
    }
    return true;
  }

  execute() {
    this.visited.push(this.current());
    switch (this.current().operation) {
      case "nop":
        this.currentIndex += 1;
        break;
      case "acc":
        this.accumulator += this.current().magnitude;
        this.currentIndex += 1;
        break;
      case "jmp":
        this.currentIndex += this.current().magnitude;
        break;
    }
  }

  current() {
    return this.instructions[this.currentIndex];
  }
}

const switchNopJmp = (index) => {
  if (instructions[index].operation === "jmp") {
    instructions[index].operation = "nop";
  } else {
    instructions[index].operation = "jmp";
  }
};

for (let i = 0; i < instructions.length; i++) {
  if (instructions[i].operation === "acc") continue;
  switchNopJmp(i);

  const game = new Game(instructions);
  if (game.play()) console.log(game.accumulator);

  switchNopJmp(i);
}

module.exports = {
  Game: Game,
};
