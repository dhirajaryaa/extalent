import apiInstance from "@/api/api";
import userStore from "@/store/user.store";

export const AuthChecker = async () => {
  const { user, setUser, removeUser } = userStore.getState();
  try {
    if (!user) {
      const { data } = await apiInstance.get("/auth/me");
      if (data.data) {
        setUser(data.data);
        return { isAuthenticated: true };
      }
    } else {
      removeUser();
      return { isAuthenticated: false }
;
    }
  } catch (error) {
    removeUser();
    return { isAuthenticated: false }
;
  }
};
