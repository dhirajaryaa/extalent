import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Dashboard, LandingPage, LoginPage, Profile } from "./pages";
import { AuthChecker } from "./lib/authChecker";
import { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// query client setup
const queryClient = new QueryClient();

// configure routes
const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
    index: true,
  },
  {
    path: "/login",
    Component: LoginPage,
  },

  {
    Component: App,
    loader: AuthChecker,
    HydrateFallback: () => (
      <div className="p-4 text-center text-gray-500">
        Loading protected route...
      </div>
    ),
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
