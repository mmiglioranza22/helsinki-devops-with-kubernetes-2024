const express = require("express");
const Todo = require("../models/todos");
const todoSchema = require("../util/validator");

const router = express.Router();

router.get("/", async (_, res) => {
  const todos = await Todo.findAll({});
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  try {
    const { error, value } = todoSchema.validate(text);
    if (error) {
      throw error;
    } else {
      const todo = await Todo.create({ text: value });
      res.status(201).json(todo);
    }
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Todo text must be min 5 and max 140 characters long" });
    return;
  }
});

module.exports = router;
