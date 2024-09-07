const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { ping } = require("./ping");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("OK");
  res.send("ok");
});

app.get("/pingpong", (req, res) => {
  const pingpong = ping();
  res.status(200).json(pingpong);
});

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
