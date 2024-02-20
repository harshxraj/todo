import React, { useState } from "react";
import { motion } from "framer-motion";
import { EncryptButton } from "../components/Button";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <Content />
      <FuzzyOverlay />
    </div>
  );
};

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: 'url("https://www.hover.dev/black-noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};

const Content = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        formData
      );
      // console.log(res.data);
      navigate("/");
      localStorage.setItem("todo_token", res.data.access_token);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };
  return (
    <div className="relative h-screen flex flex-col place-content-center space-y-6 bg-neutral-950 p-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#171717",
            color: "#fff",
            border: "1px solid white",
          },

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-sm p-4 mx-auto mt-8 rounded-md shadow-md"
      >
        <h2 className="text-4xl italic font-bold mb-12 text-center text-white">
          Log in!
        </h2>

        <div className="mb-4 mt-7">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="text-right">
          <Link to="/register">
            <p className="hover:cursor-pointer hover:underline">
              Need a new account?
            </p>
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <EncryptButton TARGET_TEXT="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
