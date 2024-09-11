const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

let counter = 0;

const ping = async () => {
  counter++;
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/pingpong", (req, res) => {
  ping();
  res.send("pong");
});

app.get("/check", async (req, res) => {
  res.send("check ping");
});

app.get("/tellmeyoursecret", async (req, res) => {
  const secret = process.env.API_KEY || "not telling you";
  res.send(secret);
});

app.get("/", (req, res) => {
  res.send(String(counter));
});

app.listen(PORT, () => {
  console.log("Pingpong app: Started");
  console.log(`Server listening to port: ${PORT}`);
});
