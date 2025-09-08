import userStore from "@/store/user.store";
import React from "react";

function Dashboard() {
  const { user } = userStore();
  // console.log(user);
  
  return <div>Dashboard</div>;
}

export default Dashboard;
