import express from "express";
import { createTodo, getAllTodos } from "../controllers/todo.controller.js";

const todoRouter = express.Router();

// todoRouter.post("/", );
todoRouter.get("/", getAllTodos);
todoRouter.post("/create", createTodo);

export default todoRouter;
