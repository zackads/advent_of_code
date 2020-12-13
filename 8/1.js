class Game {
  constructor(instructions) {
    this.accumulator = 0;
    this.currentIndex = 0;
    this.instructions = this.#parse(instructions);
  }

  play() {
    while (
      this.currentIndex < this.instructions.length &&
      this.current().executed_times === 0
    ) {
      this.execute();
    }
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
      default:
        throw Error("Unrecognised operation");
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

  #parse(rawInstructions) {
    return rawInstructions.map((rawInstruction) => {
      const operation = rawInstruction.split(" ")[0];
      const magnitude = parseInt(rawInstruction.split(" ")[1]);
      return { operation: operation, magnitude: magnitude, executed_times: 0 };
    });
  }
}

const fs = require("fs");
const instructions = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

const game = new Game(instructions);
game.play();
console.log(game.accumulator);

module.exports = {
  Game: Game,
};
