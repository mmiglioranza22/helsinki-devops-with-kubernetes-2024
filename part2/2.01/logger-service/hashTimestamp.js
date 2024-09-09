const { v4: uuidv4 } = require("uuid");

let randomHash = "no hash";
const getHashNow = () => {
  randomHash = `${new Date().toISOString()}: ${uuidv4()}`;
  setTimeout(getHashNow, 5000);
};

module.exports = { getHashNow };
