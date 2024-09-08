const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { ping } = require("./ping");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/pingpong", async (req, res) => {
  await ping();
  res.send("pong");
});

app.listen(PORT, () => {
  console.log("Pingpong app: Started");
  console.log(`Server listening to port: ${PORT}`);
});
