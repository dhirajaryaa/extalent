import apiInstance from "@/api/api";
import userStore from "@/store/user.store";

export const AuthChecker = async () => {
  const { user, setUser, removeUser } = userStore.getState();

  const {data} = await apiInstance.get("/auth/me");

  if (!user) {
    setUser(data.data)
    return !!user
  }else{
    removeUser()
  }
};
