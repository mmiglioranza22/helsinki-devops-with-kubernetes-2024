const path = require("path");
const fs = require("fs");
const express = require("express");
const { randomHash } = require("./hashTimestamp");

const directory = path.join("/", "usr", "src", "app", "files");
const pingsFilePath = path.join(directory, "pings.txt");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/hash", async (req, res) => {
  const previousPings = await fs.promises.readFile(
    pingsFilePath,
    "utf-8",
    (err, string) => {
      if (err) {
        return console.log("FAILED TO READ PING FILE", "----------------", err);
      }
      return string ?? 0;
    }
  );
  const response = randomHash + "\n" + "Ping / Pongs: " + previousPings;

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log("Logger app: Started");
  console.log(`Server listening to port: ${PORT}`);
});
