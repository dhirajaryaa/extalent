import { Navigate, Outlet, useLoaderData } from "react-router";
import Layout from "./layout/layout";

function App() {
  const { isAuthenticated } = useLoaderData();

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={"/login"} replace />
  );
}

export default App;
