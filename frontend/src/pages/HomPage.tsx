import axios from "axios";
import React, { createContext, useEffect } from "react";
import Board from "../components/Board";
import BarPoll from "../components/BarPoll";

export const TodoContext = createContext({});

const HomePage: React.FC = () => {
  let backlogCount = 0;
  const fetchAllTodos = async () => {
    try {
      const token = localStorage.getItem("todo_token");
      let res = await axios.get("http://localhost:3000/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      const { doneCount, doingCount } = res.data.reduce(
        (counts, todo) => {
          if (todo.column === "done") {
            counts.doneCount++;
          } else if (todo.column === "doing") {
            counts.doingCount++;
          }
          return counts;
        },
        { doneCount: 0, doingCount: 0 }
      );
      console.log(doneCount, doingCount);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);
  return (
    <TodoContext.Provider value={{ fetchAllTodos }}>
      <div className="bg-neutral-900">
        <Board />
        <BarPoll />
      </div>
    </TodoContext.Provider>
  );
};

export default HomePage;
