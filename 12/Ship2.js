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
  }

  move(action) {
    const { direction, distance } = this.#parse(action);
    switch (direction) {
      case "L":
      case "R":
        this.#rotateWaypoint(direction, distance);
        break;
      case "N":
      case "S":
      case "E":
      case "W":
        this.#moveWaypoint(direction, distance);
        break;
      case "F":
        this.#moveShip(distance);
        break;
      default:
        throw "Unhandled action:" + direction;
    }
  }

  #moveShip(distance) {
    for (let i = 0; i < distance; i++) {
      this.position = {
        east: this.position.east + this.waypoint_position.east,
        north: this.position.north + this.waypoint_position.north,
      };
    }
  }

  #moveWaypoint(direction, distance) {
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

  #rotateWaypoint(direction, distance) {
    const { east, north } = this.waypoint_position;
    switch (direction + distance) {
      case "R90":
      case "L270":
        this.waypoint_position.east = north;
        this.waypoint_position.north = -east;
        break;
      case "L180":
      case "R180":
        this.waypoint_position.east = -east;
        this.waypoint_position.north = -north;
        break;
      case "L90":
      case "R270":
        this.waypoint_position.east = -north;
        this.waypoint_position.north = east;
        break;
      default:
        throw "Unhandled rotation of the waypoint: " + direction + distance;
    }
  }

  #parse(action) {
    const direction = action[0];
    let distance = Number(action.slice(1));
    if (direction === "S" || direction === "W") distance = -distance;
    return {
      direction: direction,
      distance: distance,
    };
  }
}

module.exports = {
  Ship: Ship,
};
