class Ship {
  constructor() {
    this.position = {
      east: 0,
      north: 0,
    };
    this.waypoint_position = {
      east: 10,
      north: 1,
    };
    this.waypoint_bearing = 90; // East
  }

  move(action) {
    const { direction, distance } = this.#parse(action);
    if (direction === "L" || direction === "R")
      this.#setWaypointPosition(action);
    if (direction === "N" || direction === "S") {
      this.waypoint_position = {
        east: this.waypoint_position.east,
        north: this.waypoint_position.north + distance,
      };
    }
    if (direction === "E" || direction === "W") {
      this.waypoint_position = {
        east: this.waypoint_position.east + distance,
        north: this.waypoint_position.north,
      };
    }
    if (direction === "F") {
      for (let i = 0; i < distance; i++) {
        this.position = {
          east: this.position.east + this.waypoint_position.east,
          north: this.position.north + this.waypoint_position.north,
        };
      }
    }
  }

  #setWaypointPosition(action) {
    switch (action) {
      case "R90":
        const { east, north } = this.waypoint_position;
        this.waypoint_position.east = north;
        this.waypoint_position.north = -east;
        break;
      case "R180":
        break;
      case "R270":
        break;
      case "L90":
        break;
      case "L180":
        break;
      case "L270":
        break;
      default:
        throw "Unhandled rotation of the waypoint";
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
