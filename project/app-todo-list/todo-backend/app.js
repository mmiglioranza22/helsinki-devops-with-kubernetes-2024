const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const todosRouter = require("./routes/todos");

const PORT = process.env.PORT || 6000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
