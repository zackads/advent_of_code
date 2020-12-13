class Game {
  constructor(instructions) {
    this.accumulator = 0;
    this.instructions = this.#parse(instructions);
    this.currentIndex = 0;
  }

  play() {
    while (this.currentIndex < this.instructions.length) {
      this.execute();
    }
  }

  execute() {
    if (this.current().operation === "nop") {
      this.forward(1);
    } else if (this.current().operation === "acc") {
      this.accumulator += this.current().magnitude;
      this.forward(1);
    } else if (this.current().operation === "jmp") {
      this.forward(this.current().magnitude);
    }
    console.log(this.currentIndex, this.instructions.length);
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
