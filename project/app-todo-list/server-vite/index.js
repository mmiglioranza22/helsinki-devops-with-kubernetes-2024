const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 5454;

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("dev"));
// with the database, startup might not wait for it to start, so first request can fail

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
