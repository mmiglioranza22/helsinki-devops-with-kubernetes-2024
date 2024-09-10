const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const moment = require("../vite-app/node_modules/moment/ts3.1-typings/moment");

const PORT = process.env.PORT || 5000;

// get the file or image
const directory = path.join("/", "usr", "src", "app", "build");
const filePath = path.join(directory, "image.jpg");
const fileSavedLogPath = path.join(directory, "log.txt");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()));

const writableStream = fs.createWriteStream(filePath);

writableStream.on("error", (error) => {
  console.log(
    `An error occured while writing to the file. Error: ${error.message}`
  );
});

const fetchImageAndSaveLog = async () => {
  const response = await axios.get("https://picsum.photos/200", {
    responseType: "stream",
  });
  // Save log (file gets overwitten each time)
  const now = moment().toString();
  await fs.promises.writeFile(fileSavedLogPath, now, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  console.log(`Image fetched at ${now}`);
  // Save image
  response.data.pipe(writableStream);
};

const findAFile = async () => {
  if (await fileAlreadyExists()) {
    console.log("Existing image file. Checking last image fetch...");
    const imageAge = await fs.promises.readFile(
      fileSavedLogPath,
      "utf-8",
      (err, buffer) => {
        if (err) {
          return console.log(
            "FAILED TO READ LOG FILE",
            "----------------",
            err
          );
        }
        return buffer;
      }
    );
    const diff = moment().diff(moment(imageAge), "minutes");
    console.log({ diff });
    if (diff > 5) {
      // we remove the file each time to avoid any permissions issues from flags passed to writableStream: https://stackoverflow.com/questions/11995536/node-js-overwriting-a-file
      await removeFile();
      console.log("Old image. Fetching new image...");
      await fetchImageAndSaveLog();
    } else {
      console.log("Using old image");
      return;
    }
  } else {
    console.log("No image. Fetching new image for first time...");
    await fetchImageAndSaveLog();
  }
};

const app = express();

app.use(cors());
app.use(express.static("./build"));
app.use(express.json());
app.use(morgan("dev"));

findAFile();
// app.get("/ping", async (req, res) => {
//   const lastSavedFileLog = await fs.promises.readFile(fileSavedLogPath);
//   res.send("pong: " + lastSavedFileLog);
// });

// app.get("/manual", async (req, res) => {
//   await fetchImageAndSaveLog();
//   res.send("ok");
// });

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
