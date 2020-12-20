class Ship {
  constructor() {
    this.current_position = {
      east: 0,
      north: 0,
    };
    this.heading = 90; // East
  }

  move(action) {
    const { direction, distance } = this.#parse(action);
    if (direction === "L" || direction === "R")
      this.#setHeading(direction, distance);
    if (direction === "N" || direction === "S") {
      this.current_position = {
        east: this.current_position.east,
        north: this.current_position.north + distance,
      };
    }
    if (direction === "E" || direction === "W") {
      this.current_position = {
        east: this.current_position.east + distance,
        north: this.current_position.north,
      };
    }
    if (direction === "F" && (this.heading === 90 || this.heading === 270)) {
      this.current_position = {
        east: this.current_position.east + distance,
        north: this.current_position.north,
      };
    }
    if (direction === "F" && (this.heading === 0 || this.heading === 180)) {
      this.current_position = {
        east: this.current_position.east,
        north: this.current_position.north + distance,
      };
    }
  }

  #setHeading(direction, degrees) {
    switch (direction) {
      case "L":
        this.heading = (this.heading - degrees) % 360;
        if (this.heading < 0) this.heading += 360;
        break;
      case "R":
        this.heading = (this.heading + degrees) % 360;
        break;
    }
  }

  #parse(action) {
    const direction = action[0];
    let distance = Number(action.slice(1));
    if (direction === "S" || direction === "W") distance = -distance;
    if (direction === "F" && (this.heading === 180 || this.heading === 270))
      distance = -distance;
    return {
      direction: direction,
      distance: distance,
    };
  }
}

module.exports = {
  Ship: Ship,
};
