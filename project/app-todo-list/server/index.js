const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hello.html"));
});
app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
