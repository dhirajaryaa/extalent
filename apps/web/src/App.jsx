import userStore from "./store/user.store";
import { Navigate, Outlet } from "react-router";

function App() {
  const { user, isAuthenticated } = userStore();

  return user && isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
}

export default App;
