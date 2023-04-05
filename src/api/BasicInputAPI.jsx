import axiosInstance from "./config";

export const createBasicInput = (data) => {
  return axiosInstance.get("/todos");
};
