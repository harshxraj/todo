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

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await todo.save();

    return res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (err) {
    console.error("Error updating todo:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting todo with ID:", id);

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      console.log("Todo not found with ID:", id);
      return res.status(404).json({ error: "Todo not found" });
    }

    await User.updateMany({ todos: id }, { $pull: { todos: id } });

    return res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (err) {
    console.error("Error deleting todo:", err);
    return res.status(500).send("Internal Server Error");
  }
};
