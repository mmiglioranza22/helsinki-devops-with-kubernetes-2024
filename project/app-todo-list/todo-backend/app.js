const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { connectToDatabase } = require("./db");
const todosRouter = require("./routes/todos");

const PORT = process.env.PORT || 5555;

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/api/todos", todosRouter);
// with the database, startup might not wait for it to start, so first request can fail
// a readiness check could help fixing this
app.listen(PORT, async () => {
  console.log("Todo-backend api: Started");
  console.log(`Server listening to port: ${PORT}`);
  console.log("Connecting to db...");
  await connectToDatabase();
});
