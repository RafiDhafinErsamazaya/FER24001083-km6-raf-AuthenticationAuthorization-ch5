import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DetailMovie from "./DetailMovie";
import SearchMovie from "./Search";
import Login from "./login";
import Register from "./register";
import Homepage from "./Homepage";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/search-movie",
      element: <SearchMovie />,
    },
    {
      path: "/detail-movie",
      element: <DetailMovie />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="229289081178-5727nb29tf856p9vessoskqb28u5gq3h.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
