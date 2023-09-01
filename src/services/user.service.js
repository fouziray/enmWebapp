import axios from "axios";
import authHeader from "./auth-header";
const config = {
  headers: { Authorization: JSON.parse(localStorage.getItem("token"))["token"] ? `Token `+JSON.parse(localStorage.getItem("token"))["token"] : `Token ad76a4c1c0ce826e319eb392a1849f3b0ccf2a5b` }
};
const config2 = {
  headers: { Authorization: JSON.parse(localStorage.getItem("token"))["token"] ? `Token `+JSON.parse(localStorage.getItem("token"))["token"] : `Token ad76a4c1c0ce826e319eb392a1849f3b0ccf2a5b`,'content-type': 'multipart/form-data'}
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

const setProfilePicture= async(user)=>{
let response=await axios.put(API_URL + "users/",user,config).then(response =>  axios.post(API_URL+'profile/?id='+response.data["id"],user,config2));
return response.data
}
const userService = {
  getUsers,
  getMessage,
  getuserGroupNumber,
  setProfilePicture
};

export default userService