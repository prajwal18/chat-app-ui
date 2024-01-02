import axios from "axios";
import { getToken } from "./CookieFunctions";

const token = getToken();

const jwtAxios = axios.create({
    headers: {
        Authorization: `bearer ${token}`
    }
});

export default jwtAxios;
