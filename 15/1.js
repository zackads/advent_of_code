// With thanks to https://github.com/delventhalz/advent-of-code-2020/blob/main/15%20-%20Rambunctious%20Recitation/memory-game.js
// Algorithim optimization problem, solved by clever use of array indexes and the Uint32Array data type initialized to length

const nthNumber = (starting_numbers, n) => {
  const memory = new Uint32Array(n);
  const getMemory = (key) => memory[key];
  const setMemory = (key, value) => (memory[key] = value); // Uses the array index as the number spoken (value), sets value at index to the turn (index).  Reversing index and value speeds up lookup.

  for (let i = 0; i < starting_numbers.length - 1; i += 1) {
    setMemory(starting_numbers[i], i + 1);
  }

  let last_spoken = starting_numbers[starting_numbers.length - 1];

  for (let i = starting_numbers.length; i < n; i += 1) {
    const remembered = getMemory(last_spoken); // Looks up using the index, very quick.
    setMemory(last_spoken, i);
    last_spoken = remembered ? i - remembered : 0;
  }

  return last_spoken;
};

console.log(nthNumber([10, 16, 6, 0, 1, 17], 30000000));

module.exports = {
  nthNumber: nthNumber,
};
