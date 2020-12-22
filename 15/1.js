const nthNumber = (starting_numbers, n) => {
  const spoken = starting_numbers;
  const lastNumberSpoken = spoken.slice(-1)[0];
  for (let i = starting_numbers.length; i < n; i++) {
    if (!lastSpokenHasBeenSaidBefore(spoken)) {
      spoken.push(0);
    } else {
      spoken.push(
        i - (spoken.slice(0, -1).lastIndexOf(spoken.slice(-1)[0]) + 1)
      );
    }
  }
  return spoken[n - 1];
};

const lastSpokenHasBeenSaidBefore = (spoken) =>
  spoken.slice(0, -1).includes(spoken.slice(-1)[0]);

// console.log(nthNumber([10, 16, 6, 0, 1, 17], 30000000));

module.exports = {
  nthNumber: nthNumber,
};
