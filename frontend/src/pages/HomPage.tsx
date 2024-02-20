import axios from "axios";
import React, { createContext, useEffect } from "react";
import Board from "../components/Board";
import { useNavigate } from "react-router-dom";

export const TodoContext = createContext({});

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("todo_token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const fetchAllTodos = async () => {
    try {
      const token = localStorage.getItem("todo_token");
      await axios.get(`${import.meta.env.VITE_BASE_URL}/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);
  return (
    <div className="bg-neutral-900">
      <Board />
    </div>
  );
};

export default HomePage;
