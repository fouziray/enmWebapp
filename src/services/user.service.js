import axios from "axios";
import authHeader from "./auth-header";
const config = {
  headers: { Authorization: `Token ad76a4c1c0ce826e319eb392a1849f3b0ccf2a5b` }
};
const API_URL = "http://localhost:8000/";



const getUsers= () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getMessage = () => {
  return axios.get(API_URL + "reponse/se", { headers: authHeader() });
};

const getuserGroupNumber=(user_id)=>{
  return axios.get(API_URL + "userinwhichgroup/"+user_id, config);

}

const userService = {
  getUsers,
  getMessage,
  getuserGroupNumber,
};

export default userService