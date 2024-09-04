const { v4: uuidv4 } = require("uuid");

const getHashNow = () => {
  const randomHash = uuidv4();

  console.log(`${new Date().toISOString()}: ${randomHash}`);

  setTimeout(getHashNow, 5000);
};

getHashNow();
