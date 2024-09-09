const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const PORT = process.env.PORT || 5000;

// get the file or image
const directory = path.join("/", "usr", "src", "app", "build");
const filePath = path.join(directory, "image.jpg");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const writableStream = fs.createWriteStream(filePath);

writableStream.on("error", (error) => {
  console.log(
    `An error occured while writing to the file. Error: ${error.message}`
  );
});

const findAFile = async () => {
  if (await fileAlreadyExists()) return;
  console.log("Fetching image...");

  await new Promise((res) => fs.mkdir(directory, (err) => res()));
  const response = await axios.get("https://picsum.photos/200", {
    responseType: "stream",
  });
  console.log("Image fetched!");
  response.data.pipe(writableStream);
};

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()));
// fetch/save image
const app = express();

app.use(cors());
app.use(express.static("./build"));
app.use(express.json());
app.use(morgan("dev"));

findAFile();
app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
