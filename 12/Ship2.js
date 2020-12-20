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
      this.#setWaypointPosition(direction, distance);
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

  #setWaypointPosition(direction, degrees) {
    switch (direction) {
      case "L":
        this.waypoint_bearing = (this.waypoint_bearing - degrees) % 360;
        if (this.waypoint_bearing < 0) this.waypoint_bearing += 360;
        break;
      case "R":
        this.waypoint_bearing = (this.waypoint_bearing + degrees) % 360;
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
