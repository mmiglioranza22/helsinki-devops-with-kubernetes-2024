const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

// fetch/save image

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "image.jpg");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const findAFile = async () => {
  if (await fileAlreadyExists()) return;

  await new Promise((res) => fs.mkdir(directory, (err) => res()));
  const response = await axios.get("https://picsum.photos/200", {
    responseType: "stream",
  });
  response.data.pipe(fs.createWriteStream(filePath));
};

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()));
//

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  try {
    // await findAFile();
  } catch (error) {
    console.log("FAILED TO READ FILE", "----------------", error);
  } finally {
    res.sendFile(path.join(__dirname, "hello.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
