const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todosy = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    tasks: {
      type: String,
      required: true,
    },
    dateOfTodo: {
      type: String,
      required: true,
      match: [/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, "Invalid date format. Use DD/MM/YYYY."],
    },
  },
  { toJSON: { virtuals: true, versionKey: false }, toObject: { versionKey: false } }
);

todosy.index({ userId: 1, dateOfTodo: 1 }, { unique: true });

const todoSchema = mongoose.model("todolist", todosy);

module.exports = todoSchema;
