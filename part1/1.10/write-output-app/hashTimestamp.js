const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const directory = path.join("/", "usr", "src", "app", "files");

const filePath = path.join(directory, "logs.txt");

const writableStream = fs.createWriteStream(filePath);

writableStream.on("error", (error) => {
  console.log(
    `An error occured while writing to the file. Error: ${error.message}`
  );
});

// ---------

let randomHash = "no hash";

const getHashNow = () => {
  randomHash = `${new Date().toISOString()}: ${uuidv4()}`;
  console.log(randomHash);
  writableStream.write(`${randomHash}\n`);
  setTimeout(getHashNow, 5000);
};

module.exports = getHashNow;
