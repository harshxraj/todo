import Todo from "../models/Todo.model.js";
import User from "../models/User.model.js";

export const getAllTodos = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id }).populate("todos");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const simplifiedTodos = user.todos.map((todo) => ({
      id: todo._id,
      title: todo.title,
      column: todo.column,
    }));

    return res.status(200).json(simplifiedTodos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, column } = req.body;
    const newTodo = await Todo.create({ title, userId: req.id, column });
    await newTodo.save();

    const currentUser = await User.findById(req.id);
    currentUser.todos.push(newTodo._id);
    await currentUser.save();
    res.status(201).json({ msg: "todo created", newTodo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
