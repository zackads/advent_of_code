# My Advent of Code 2020 solutions

## Day-by-day

### [Day 1](1)

Find two (part 1) and three (part 2) numbers in a list that sum to a given value. Solved with nested `for` loops.

### [Day 2](2)

Parse password rules and apply to input data by checking indices of strings. Solved with validators applied in a reduce function.

### [Day 3](3)

Ski slope! Find how many `#`s in several diagonal lines on a very big matrix. Solved by iterating over each line and identifying checking array indices depencing on the gradient of the slope.

### [Day 4](4)

Parse and apply rules to validate passport data. Solved with an handful of validator functions applied to each passport.

### [Day 5](5) \*

Convert binary (in the form of aeroplane seat references, e.g. `FBBFFFB`) to decimal. Created a generalised, reusable `bin2dec` function and then called it using domain language (`calcSeatId`) to find the solution. Felt good today about identifying the underlying problem, creating a general solution then applying it in a specific domain.

### [Day 6](6)

Parsing different groups' answers on customs control forms. I could have used [set operations](<https://en.wikipedia.org/wiki/Set_(abstract_data_type)>) for this to solve quickly/easily, but didn't see that solution. Instead I used a reduce function to iteratively create a histogram of each groups answers, then another iteration over the histogram to find the answer to the question.

### [Day 7](7) \*

In a list of bags that include bags that include bags and so on (a directed acyclic graph), count the total number of one type of bag. Parsed into an adjacency list and solved with depth-first search.

### [Day 8](8)

Execute a list of instructions in a basic programming language, including essentially `GOTO` statements. Solved using OOP with an object to keep track of the current execution state.

### [Day 9](9)

Getting maths-y now. Solved with iteration, though I think could have been done with set operations.

### [Day 10](10) \*

Count the number of paths on a directed acyclic graph. Solved with a memoised recursive function.

### [Day 11](11) \*

Two-dimensional [cellular automaton problem](https://en.wikipedia.org/wiki/Cellular_automaton).

### [Day 12](12)

Similar to the [Mars Rover](https://technologyconversations.com/2014/10/17/java-tutorial-through-katas-mars-rover/) kata.

### [Day 13](13) \*

[Chinese Remainder Theorum](https://en.wikipedia.org/wiki/Chinese_remainder_theorem). This blew my mind, had no idea where to start and had to rely on Reddit to help me get to the solution.

### [Day 14](14)

Converting between decimal and binary again, this time with a [bitmask](<https://en.wikipedia.org/wiki/Mask_(computing)>).

### [Day 15](15)

Algorithm optimization problem. First did a naive solution with a nested `for` loop, then had to seek help to use dynamic programming to optimize it for the part 2.

### [Day 16](16)

Complicated parsing and validation puzzle. Solved with regex and a reduce function.

### [Day 17](17) \*

Three- and then four-dimensional cellular automaton problem. Attempted to solve with a triple-nested array but didn't get anywhere fast. Eventually solved with [https://cestlaz.github.io/post/advent-2020-1718/](help) by storing the data in a flat structure, using string manipulation to change coordinates around the "infinite dimension" and using a set to hold active cells.

### [Day 18](18) \*

Evaluate mathematical expressions with brackets but without operator precedence. Solved by writing a function to the infix expressions to postfix using a version of the [shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) (modified to remove operator precedence) then evaluating.

### [Day 19](19)

Validate strings based on an interdependent language grammer. Tried to solve using a graph, failed. After searching Reddit, eventually solved by generating a mammoth regular expression. Cheated slightly at part 2 (which introduced infinitie cycles to the grammar and would require `a lot of work` to solve) by changing the input to limit the number of cycles.

### [Day 20](20)

This code is broken, and so was I by the time I'd finished with it. Thanks Advent of Code 2020 for a great learning experience! I'll be back next year for my 50 stars...

\* A puzzle I found particularly fun/interesting/challenging.
