import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.controller.js";

const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);
todoRouter.post("/create", createTodo);
todoRouter.patch("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
