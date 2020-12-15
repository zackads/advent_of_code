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

// Directed adjacency list, e.g. { 1: [3], 3: [5], 5: []}
const createGraph = (vertices) =>
  vertices
    .sort((a, b) => a - b)
    .reduce((adj, vertex, i, array) => {
      adj[vertex] = [];
      for (let j = i + 1; array[j] <= vertex + 3; j++) {
        adj[vertex].push(array[j]);
      }
      return adj;
    }, {});

const addOutletAndDevice = (adapters) => {
  const outletJolts = 0;
  const deviceJolts = Math.max(...adapters) + 3;
  return [outletJolts, ...adapters, deviceJolts];
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
  graph[start].forEach(
    (vertex) => (counter += countPaths(graph, vertex, finish))
  );
  return counter;
});

const graph = createGraph(addOutletAndDevice(adapters));
const device = addOutletAndDevice(adapters).slice(-1)[0];

console.log(countPaths(graph, 0, device));

module.exports = {
  createGraph: createGraph,
  countPaths: countPaths,
  memoize: memoize,
};
