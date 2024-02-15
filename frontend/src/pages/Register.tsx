import React, { useState } from "react";
import { EncryptButton } from "../components/Button";
import axios from "axios";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<{
    fullname: string;
    email: string;
    password: string;
  }>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform signup logic with formData
    console.log("Signing up with:", formData);
    try {
      let res = await axios.post("http://localhost:3000/auth/signup", formData);
      console.log(res.data);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data.error);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-100 w-full max-w-md p-4 mx-auto mt-8 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Sign Up
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
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
        <EncryptButton TARGET_TEXT="Register" />
        {/* <button
          type="submit"
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Sign Up
        </button> */}
      </form>
    </div>
  );
};

export default Register;
