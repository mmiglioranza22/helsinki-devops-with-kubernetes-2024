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

app.listen(PORT, async () => {
  console.log("Todo-backend api: Started");
  console.log(`Server listening to port: ${PORT}`);
  console.log("Connecting to db...");
  await connectToDatabase();
});
