const express = require("express");
const getHashNow = require("./hashTimestamp");

const app = express();

const PORT = process.env.PORT || 3001;

getHashNow();

app.listen(PORT, () => {
  console.log("WRITE_APP: Started");
  console.log(`Server listening to port: ${PORT}`);
});
