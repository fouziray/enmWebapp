import axios from "axios";

const API_URL = "http://localhost:8000/";

const login = (username, password) => {
    console.log("this is",  {
    username,password
  });
  return axios
    .post(API_URL + "login/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;