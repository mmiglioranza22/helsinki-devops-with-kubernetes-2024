const express = require("express");
const Todo = require("../models/todos");

const router = express.Router();

router.get("/", async (_, res) => {
  const todos = await Todo.findAll({});
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({ text });

  res.status(201).json(todo);
});

module.exports = router;
