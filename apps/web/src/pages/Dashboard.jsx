import Layout from "@/layout/layout";
import userStore from "@/store/user.store";

function Dashboard() {
  const { user } = userStore();
  
  return <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. A deleniti exercitationem nostrum facere ipsum, et eveniet totam obcaecati officia eaque illo neque velit voluptates at! Provident dicta saepe voluptate commodi!
  </div>;
}

export default Dashboard;
