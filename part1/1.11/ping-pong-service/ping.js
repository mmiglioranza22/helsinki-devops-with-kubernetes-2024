const path = require("path");
const fs = require("fs");

const directory = path.join("/", "usr", "src", "app", "files");
const pingsFilePath = path.join(directory, "pings.txt");

const previousPingsFileExists = async () =>
  new Promise((res) => {
    fs.stat(pingsFilePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

let counter = 0;
let checkedPingFileOnce = false; // the very first time check if the ping file was checked already

const ping = async () => {
  // on start up, the following if block will be checked only once
  if ((await previousPingsFileExists()) && !checkedPingFileOnce) {
    checkedPingFileOnce = true; // do not check ping file as it was done already the first time
    counterString = await fs.promises.readFile(
      pingsFilePath,
      "utf-8",
      (err, buffer) => {
        if (err) {
          return console.log(
            "FAILED TO READ PING FILE",
            "----------------",
            err
          );
        }
        return buffer;
      }
    );
    counter = Number(counterString); // sets counter last registered value
  }

  counter++;

  // file is overwritten each time to keep track of last pingpong request
  await fs.promises.writeFile(pingsFilePath, String(counter), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

module.exports = { ping };
