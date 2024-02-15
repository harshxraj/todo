import express from "express";
import cors from "cors";
import "dotenv/config";
import connection from "./db/connection.js";
import authRouter from "./routes/auth.routes.js";
import { auth } from "./middleware/auth.js";
import todoRouter from "./routes/todo.routes.js";

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/todo", auth, todoRouter);

server.listen(PORT, () => {
  connection();
  console.log(`Listening on port ${PORT}`);
});
