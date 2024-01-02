import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";

export const fetchUsers = async () => {
    const { data, status } = await axios.get(endpoints.user.users);
    if (status === HttpStatusCode.Ok) {
      return data;
    } else {
      throw new Error("Failed to fetch users.");
    }
  };
  
  export const fetchActiveUsers = async () => {
    const { data, status } = await axios.get(endpoints.user.users);
    if (status === HttpStatusCode.Ok) {
      return data;
    } else {
      throw new Error("Failed to fetch users.");
    }
  };