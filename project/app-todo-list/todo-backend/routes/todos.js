const express = require("express");
const router = express.Router();

const todos = [];

router.get("/", (_, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const { text } = req.body;
  const todo = { text };
  todos.push(todo);
  res.status(201).json(todo);
});

module.exports = router;
