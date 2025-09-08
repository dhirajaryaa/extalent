import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LandingPage, LoginPage } from "./pages";

// configure routes
const router = createBrowserRouter([
  // home page
  {
    path: "/",
    Component: LandingPage,
  },
  // login page
  {
    path: "/login",
    Component: LoginPage
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
