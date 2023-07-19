import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";



const getUsers= () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getMessage = () => {
  return axios.get(API_URL + "reponse/se", { headers: authHeader() });
};


const userService = {
  getUsers,
  getMessage,
};

export default userService