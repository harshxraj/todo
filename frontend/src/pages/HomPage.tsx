import axios from "axios";
import React, { useEffect } from "react";
import Board from "../components/Board";

const HomePage: React.FC = () => {
  const fetchAllTodos = async () => {
    try {
      const token = localStorage.getItem("todo_token");
      let res = await axios.get("http://localhost:3000/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);
  return (
    <div>
      Home
      <Board />
    </div>
  );
};

export default HomePage;
