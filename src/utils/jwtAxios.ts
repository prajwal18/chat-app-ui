import axios from "axios";
import { getToken } from "./CookieFunctions";

const jwtAxios = () => {
  const token = getToken();
  return axios.create({
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export default jwtAxios;
