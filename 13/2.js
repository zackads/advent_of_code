// With credit and thanks to u/crocrococ
// https://www.reddit.com/r/adventofcode/comments/kcb3bb/2020_day_13_part_2_can_anyone_tell_my_why_this/

const input =
  "17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,907,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,x,x,x,x,x,x,23,x,x,x,x,x,29,x,653,x,x,x,x,x,x,x,x,x,41,x,x,13";

const parse = (buses) =>
  buses
    .replace(/x/g, "1")
    .split(",")
    .map((id) => Number(id));

const aligns = (timestamp, buses) =>
  buses.every((bus, index) => (timestamp + index) % bus === 0);

const lcm = (...nums) => {
  const gcd = (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  const lcm_two_numbers = (x, y) =>
    !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));

  return nums.reduce((lcm, num) => {
    return lcm_two_numbers(lcm, num);
  }, nums[0]);
};

// For every bus in buses
// Increment timestamp by least common multiple of (buses.slice(0, index + 1)) until aligns(timestamp, buses.slice(0, index + 1))
// When aligns(...) is true, change increment to lcm of (buses.slice(0, index + 2)) and increment index
// Repeat until no more buses
// Final number is the timestamp where aligns(timestamp, buses)
const earliestTimestamp = (buses) => {
  let timestamp = lcm(...buses.slice(0, 1));
  let increment = timestamp;
  for (let index = 0; index < buses.length; index++) {
    while (!aligns(timestamp, buses.slice(0, index + 2))) {
      timestamp += increment;
    }
    increment = lcm(...buses.slice(0, index + 2));
  }
  return timestamp;
};

console.log(earliestTimestamp(parse(input)));

module.exports = {
  earliestTimestamp: earliestTimestamp,
  aligns: aligns,
  lcm: lcm,
};
