import { create } from "zustand";

const uiStore = create((set) => ({
  activePage: "dashboard",
  setActivePage: (page) => set({ activePage: page }),
}));
export default uiStore;