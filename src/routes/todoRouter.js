const express = require("express");
const router = express.Router();
const { createTodo, fetchAllTodos, updateTodo } = require("../controllers/todoController");

router.get("/fetchAllTodos/:userId", fetchAllTodos);
router.post("/createTodo", createTodo);
router.post("/updateTodo", updateTodo);
// router.delete("/deleteTodo", deleteTodo);

module.exports = router;
