const todoSchema = require("../models/todoModel");
const userSchema = require("../models/userModel");
const { formatDuplicateError } = require("../utils/helpers");

const createTodo = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let userExists = await userSchema.findById(userId);
    console.log(userExists, "userExists");

    if (userExists) {
      await todoSchema.create(req.body);
      res.status(200).json({ message: "Created Successfully" });
    } else {
      res.status(400).json({ message: "UserID not Found" });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).json(formatDuplicateError(error));
    } else {
      res.status(500).json({ error: error?.message });
    }
  }
};
const fetchAllTodos = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let todoList = await todoSchema.find({ userId }).lean();
    todoList = todoList.map(({ _id, __v, ...restItems }) => {
      return { ...restItems, id: _id };
    });
    res.status(200).send({ todoList });
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
};
const updateTodo = async (req, res, next) => {
  try {
    const { taskId, updatedTask } = req.body;
    let todoList = await todoSchema.updateOne({ _id: taskId }, { $set: { tasks: updatedTask } });
    console.log(todoList);

    res.status(200).json({ message: "Updated Succesfully" });
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
};

module.exports = {
  createTodo,
  fetchAllTodos,
  updateTodo,
};
