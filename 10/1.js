// Any given adapter can take an input 1, 2, or 3 jolts lower than its rating and still produce its rated output joltage.

// [ i - 1, i ], element [i - 1] must be <= (element [i] - 3)
// [1, 3, 5] is OK ✅
// [1, 5, 7] and [5, 7, 1] are not OK ❌

// [<Charging outlet = 0>, <...Your adapters>, <Your Device = 3 jolts higher than highest adaptor>]

// 1. Create graph of adapters (adjaceny list)
// 2. Solve longest path
// 3. Count jolt differences between adapters
// 4. Multiply to get answers

// -----

// With thanks to:
// https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs
// https://www.geeksforgeeks.org/longest-path-in-a-directed-acyclic-graph-dynamic-programming/

// 1.  Generate adjacency list

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");
const adapters = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((str) => parseInt(str));

const adjacencyList = (vertices) =>
  vertices
    .sort((a, b) => a - b)
    .reduce((adj, vertex, i, array) => {
      adj[vertex] = [];
      for (let j = i + 1; array[j] <= vertex + 3; j++) {
        adj[vertex].push(array[j]);
      }
      return adj;
    }, {});

const longestPath = (directed_adjacency_list) => {
  const vertices = Object.keys(directed_adjacency_list);

  const path = [];
  vertices.forEach((vertex) => {
    path.push(parseInt(vertex));
  });
  return path;
};

const accountForOutletAndDevice = (adapters) => [
  ...adapters,
  0,
  Math.max(...adapters) + 3,
];

const countJoltDiffs = (adapters, diff) => {
  return adapters
    .sort((a, b) => a - b)
    .reduce((counter, adapter, index, array) => {
      if (array[index + 1] - adapter === diff) {
        return (counter += 1);
      }
      return counter;
    }, 0);
};

const product1and3JoltDiffs = (adapters) => {
  return (
    countJoltDiffs(accountForOutletAndDevice(adapters), 1) *
    countJoltDiffs(accountForOutletAndDevice(adapters), 3)
  );
};

console.log(product1and3JoltDiffs(adapters));

module.exports = {
  adjacencyList: adjacencyList,
  longestPath: longestPath,
  product1and3JoltDiffs: product1and3JoltDiffs,
};
