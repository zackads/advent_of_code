class Game {
  constructor(instructions) {
    this.accumulator = 0;
    this.instructions = this.#parse(instructions);
    this.currentIndex = 0;
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
    this.instructions[this.currentIndex].executed_times += 1;
    switch (this.current().operation) {
      case "nop":
        this.forward(1);
        break;
      case "acc":
        this.accumulator += this.current().magnitude;
        this.forward(1);
        break;
      case "jmp":
        this.forward(this.current().magnitude);
        break;
      default:
        throw Error("Unrecognised operation");
    }
  }

  current() {
    return this.instructions[this.currentIndex];
  }

  forward(steps) {
    if (this.currentIndex + steps <= this.instructions.length) {
      this.currentIndex += steps;
    }
  }

  previous() {
    this.currentIndex -= 1;
  }

  #parse(rawInstructions) {
    return rawInstructions.map((rawInstruction) => {
      const operation = rawInstruction.split(" ")[0];
      const magnitude = parseInt(rawInstruction.split(" ")[1]);
      return { operation: operation, magnitude: magnitude, executed_times: 0 };
    });
  }
}

module.exports = {
  Game: Game,
};

// console.log(
//   "Executing instruction: " +
//     JSON.stringify(this.current()) +
//     "| Current index: " +
//     this.currentIndex
// );
