// With thanks to:
// https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs
// https://www.geeksforgeeks.org/longest-path-in-a-directed-acyclic-graph-dynamic-programming/
// https://stackoverflow.com/questions/21918436/total-number-of-paths-in-directed-acyclic-graph-containing-a-specific-link
// https://www.jstips.co/en/javascript/speed-up-recursive-functions-with-memoization/

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

const accountForOutletAndDevice = (adapters) => {
  const outletJolts = 0;
  const deviceJolts = Math.max(...adapters) + 3;
  return [outletJolts, ...adapters, deviceJolts];
};

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

// Memoized, recursive function
const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = func(...args));
  };
};

const countPaths = memoize(function (graph, start, finish) {
  counter = 0;
  if (graph[start].includes(finish)) counter += 1;
  graph[start].forEach((vertex) => {
    counter += countPaths(graph, vertex, finish);
  });
  return counter;
});

const graph = adjacencyList(accountForOutletAndDevice(adapters));
const device = accountForOutletAndDevice(adapters).slice(-1)[0];

console.log(countPaths(graph, 0, device));

module.exports = {
  adjacencyList: adjacencyList,
  longestPath: longestPath,
  product1and3JoltDiffs: product1and3JoltDiffs,
  countPaths: countPaths,
  memoize: memoize,
};
