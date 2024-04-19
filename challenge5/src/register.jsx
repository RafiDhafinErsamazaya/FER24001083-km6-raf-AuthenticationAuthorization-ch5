import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleregister = async () => {
    try {
      const responseRegister = await fetch(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            name: name,
            password: password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const jsonRegister = await responseRegister.json();
      console.log("jsonRegister", jsonRegister);

      if (responseRegister.status === 201) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        throw new Error(jsonRegister.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("Token masih aktif");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">SIGN UP</h2>
        <input
          className="w-full border rounded-md py-2 px-3 mb-4"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="w-full border rounded-md py-2 px-3 mb-4"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="w-full border rounded-md py-2 px-3 mb-14"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-primary text-white font-semibold py-3 px-14  rounded-md transition duration-300 hover:bg-red-700 mr-8"
            onClick={handleregister}
          >
            Register
          </button>
          <button
            className="bg-slate-300 text-black font-semibold py-3 px-6 rounded-md transition duration-300 hover:bg-gray-400"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back To Login
          </button>
        </div>
      </div>
    </div>
  );
}
