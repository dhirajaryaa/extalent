import { create } from "zustand";

const userStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  removeUser: () =>
    set({ user: null, isAuthenticated: false, isLoading: false }),
}));

export default userStore;
