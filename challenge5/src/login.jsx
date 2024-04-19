import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "./googlelogin";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("Token masih aktif");
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const responseLogin = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (responseLogin.status === 200) {
        localStorage.setItem("token", responseLogin.data.data.token);
        navigate("/", { state: { token: responseLogin.data.data.token } });
        alert("Login Successful, Welcome!");
        console.log("Data:", responseLogin.data);
        console.log("Response Login:", responseLogin);
      }
    } catch (error) {
      console.log(error);
      alert("Invalid username or password! Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          className="w-full border border-black rounded-md py-2 px-3 mb-4"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="w-full border border-black rounded-md py-2 px-3 mb-14"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <GoogleLogin buttonText="google login" />
        <div className="flex items-center justify-center mb-4">
          <button
            className=" bg-primary text-white font-semibold py-3 px-16  rounded-md transition duration-300 hover:bg-red-700 mr-8"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-blue-600 text-white font-semibold py-3 px-14 rounded-md transition duration-300 hover:bg-gray-400"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
