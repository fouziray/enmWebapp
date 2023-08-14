import axios from "axios";

const API_URL = "http://localhost:8000/";
const getprofileAvatar= async (userid)=>{
  const response = await axios.get(API_URL+ 'profile/'+'?id='+userid)
  return response.data;
}

const login = (username, password) => {
    
  return axios
    .post(API_URL + "login/", {
      username,
      password,
    })
    .then(async (response) => {
      get_token(username, password);
      if (response.data) {
        localStorage.setItem("username", JSON.parse(JSON.stringify(response.data)).username);
      }
      response.data.avatar= await getprofileAvatar(response.data.id);
      localStorage.setItem("avatar",await getprofileAvatar(response.data.id));
      return response.data;
    });
};
const get_token= (username,password)=>{
  return axios.post(API_URL + 'api-token-auth/',{username,
    password}).then(response=>{
      localStorage.setItem("token",JSON.stringify(response.data))
    });
}
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;