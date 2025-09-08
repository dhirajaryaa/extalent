import { Navigate, Outlet,useLoaderData } from "react-router";

function App() {
  const {isAuthenticated} = useLoaderData();
  console.log(isAuthenticated);
  

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
}

export default App;
