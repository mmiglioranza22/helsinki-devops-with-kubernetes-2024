const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

// https://stackoverflow.com/questions/6456864/why-does-node-jss-fs-readfile-return-a-buffer-instead-of-string
// https://nodejs.org/docs/latest/api/fs.html#fs_fs_readfile_path_options_callback
const getFile = async () =>
  new Promise((res) => {
    fs.readFile(filePath, "utf8", (err, buffer) => {
      if (err)
        return console.log("FAILED TO READ FILE", "----------------", err);
      res(buffer);
    });
  });

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("OK");
  res.send("ok read");
});

app.get("/read", async (req, res) => {
  const file = await getFile();
  res.status(200).json(file);
});

app.listen(PORT, () => {
  console.log("READ_APP: Started");
  console.log(`Server listening to port: ${PORT}`);
});
