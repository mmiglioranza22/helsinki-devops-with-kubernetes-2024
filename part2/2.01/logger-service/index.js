const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { getHashNow } = require("./hashTimestamp");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  let pingResponse;
  try {
    pingResponse = await axios.get("http://network-ping-log-app-svc:5151");
    // const pingResponse = await axios.get("http://ping-pong:5151");
    // const pingResponse = await axios.get(
    //   "http://network-ping-log-app-svc:5151/hash"
    // );
    // const pingResponse = await axios.get("http://ping-pong:5151/hash");

    const previousPings = pingResponse.data ?? 0;
    const hash = getHashNow();
    const response = hash + "\n" + "Ping / Pongs: " + previousPings;

    res.status(200).json(response);
  } catch (err) {
    console.log({ err, pingResponse });
    res.send("error");
  }
});

app.get("/check", async (req, res) => {
  res.send("check logger");
});

app.listen(PORT, () => {
  console.log("Logger app: Started");
  console.log(`Server listening to port: ${PORT}`);
});
