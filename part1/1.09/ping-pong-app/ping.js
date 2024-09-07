let counter = 0;
const ping = () => {
  counter++;
  return "pong " + counter;
};

module.exports = { ping };
