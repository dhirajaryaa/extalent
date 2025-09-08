import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LandingPage, LoginPage } from "./pages";

// configure routes
const router = createBrowserRouter([
  { // home page
    path: "/",
    Component: LandingPage,
    index: true
  },
  {  // login page
    path: "/login",
    Component: LoginPage
  },
  
  { // protected page
    Component: App,
    children: [
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
