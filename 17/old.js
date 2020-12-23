const pad = (matrix) => {
  const above_below = new Array(matrix[0].length + 2).fill(
    new Array(matrix[0].length + 2).fill(".")
  );

  const middle = matrix.map((horizontal_slice) => {
    horizontal_slice.forEach((row) => {
      row.push(".");
      row.unshift(".");
    });
    horizontal_slice.push(new Array(horizontal_slice[0].length).fill("."));
    horizontal_slice.unshift(new Array(horizontal_slice[0].length).fill("."));
    return horizontal_slice;
  });
  return [above_below, ...middle, above_below];
};

const cycle = (before) => {
  const after = pad(before);
  const flat_coordinates = [];
  for (let z = 0; z < after.length; z++) {
    // z
    for (let y = 0; y < after[z].length; y++) {
      // y
      for (let x = 0; x < after[z][y].length; x++) {
        // x
        flat_coordinates.push({
          x: x,
          y: y,
          z: z,
          value: after[z][y][x],
        });
      }
    }
  }

  const copy = [...flat_coordinates];
  const after_flat = flat_coordinates.map((coordinate) => {
    const neighbours = flat_coordinates.filter((potential_neighbour) => {
      //   console.log(coordinate, potential_neighbour);
      return (
        JSON.stringify(coordinate) != JSON.stringify(potential_neighbour) &&
        Math.abs(potential_neighbour.x - coordinate.x) <= 1 &&
        Math.abs(potential_neighbour.y - coordinate.y) <= 1 &&
        Math.abs(potential_neighbour.z - coordinate.z) <= 1
      );
    });
    const active_neighbours = neighbours.filter(
      (neighbour) => neighbour.value === "#"
    );
    if (coordinate.x === 2 && coordinate.y === 2 && coordinate.z === 1) {
      console.log(neighbours, active_neighbours); // 26,
    }

    let temp;
    if (
      (coordinate.value === "#" && !(active_neighbours.length === 2)) ||
      active_neighbours.length === 3
    ) {
      temp = ".";
    } else if (coordinate.value === "." && active_neighbours.length === 3) {
      temp = "#";
    } else {
      temp = coordinate.value;
    }
    coordinate.value = temp;
    return coordinate;
  });
  after_flat.forEach((coordinate) => {
    const { x, y, z, value } = coordinate;
    after[z][y][x] = value;
  });
  console.log(after);
  return after;
};
