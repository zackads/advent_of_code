const input =
  "1000186\n17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,907,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,x,x,x,x,x,x,23,x,x,x,x,x,29,x,653,x,x,x,x,x,x,x,x,x,41,x,x,13";

const parse = (input) => {
  let [earliest_departure, buses] = input.split("\n");
  earliest_departure = Number(earliest_departure);
  buses = buses.match(/\d+/g);
  return [earliest_departure, buses];
};

const busWithShortestWait = (earliest_departure, bus_ids) => {
  const buses = bus_ids.map((id) => {
    return {
      id: id,
      wait: wait(id, earliest_departure),
    };
  });

  return buses.reduce((earliest_bus, bus) =>
    bus.wait < earliest_bus.wait ? bus : earliest_bus
  );
};

const wait = (bus_id, earliest_departure) => {
  const frequency = Number(bus_id);
  let departure_time = frequency;
  while (departure_time < earliest_departure) {
    departure_time += frequency;
  }
  return departure_time - earliest_departure;
};

console.log(busWithShortestWait(...parse(input)));

module.exports = {
  busWithShortestWait: busWithShortestWait,
};
