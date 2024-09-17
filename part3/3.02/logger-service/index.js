const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { randomHash } = require("./hashTimestamp");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/check", async (req, res) => {
  res.send("check logger");
});

app.get("/", async (req, res) => {
  console.log("/ only");
  let pingResponse;
  try {
    pingResponse = await axios.get(
      "http://network-ping-log-app-svc:5151/pings"
    );

    const previousPings = pingResponse.data ?? 0;
    const response = randomHash + "\n" + "Ping / Pongs: " + previousPings;

    res.status(200).json({ response });
  } catch (err) {
    console.log({ err, pingResponse });
    res.send("error");
  }
});

app.listen(PORT, () => {
  console.log("Logger app: Started");
  console.log(`Server listening to port: ${PORT}`);
});
