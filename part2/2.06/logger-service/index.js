const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { randomHash } = require("./hashTimestamp");

const directory = path.join("/", "usr", "src", "app", "files");
const pingsFilePath = path.join(directory, "pings.txt");
// const configMapEnvsFilePath = path.join(directory, "information.txt");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/hash", async (req, res) => {
  const previousPings = await fs.promises.readFile(
    pingsFilePath,
    "utf-8",
    (err, buffer) => {
      if (err) {
        return console.log("FAILED TO READ PING FILE", "----------------", err);
      }
      return buffer;
    }
  );
  // const configMapEnvs = await fs.promises.readFile(
  //   configMapEnvsFilePath,
  //   "utf-8",
  //   (err, buffer) => {
  //     if (err) {
  //       return console.log(
  //         "FAILED TO READ INFORMATION FILE",
  //         "----------------",
  //         err
  //       );
  //     }
  //     return buffer;
  //   }
  // );
  const fileContent =
    process.env.INFORMATION_FILE || "file was not read, this is hardcoded";
  const variable = process.env.VAR_FROM_CONFIGMAP || "source code var";
  const response =
    "file content: " +
    fileContent +
    "\n" +
    "env variable: " +
    variable +
    "\n" +
    randomHash +
    "\n" +
    "Ping / Pongs: " +
    (previousPings ?? 0);

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log("Logger app: Started");
  console.log(`Server listening to port: ${PORT}`);
});
