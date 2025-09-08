import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Dashboard, LandingPage, LoginPage } from "./pages";
import { AuthChecker } from "./lib/authChecker";
import { Suspense } from "react";

// configure routes
const router = createBrowserRouter([
  {
    // home page
    path: "/",
    Component: LandingPage,
    index: true,
  },
  {
    // login page
    path: "/login",
    Component: LoginPage,
  },

  {
    // protected page
    Component: App,
    loader: AuthChecker,
     HydrateFallback: () => <div className="p-4 text-center text-gray-500">Loading protected route...</div>,
    children: [
      {
        // dashboard page
        path: "dashboard",
        Component: Dashboard,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>

);
