import apiInstance from "./api";

const getUserProfileApi = async () => {
  return await apiInstance.get("/profile").then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.data;
  });
};

export { getUserProfileApi };