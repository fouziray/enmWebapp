import axios from "axios";

const API_URL = "http://localhost:8000/";
const getprofileAvatar= async (userid)=>{
  const response = await axios.get(API_URL+ 'profile/?id='+userid);
   localStorage.setItem("avatar",JSON.stringify(response.data));
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
      //localStorage.setItem("avatar",await getprofileAvatar(response.data.id));
      return response.data;
    });
};
const signin= (username,firstname,lastname,email,password,fonction,image)=>{
  let form_data= new FormData();
  form_data.append('username',username);
  form_data.append('first_name',firstname);
  form_data.append('lastname',lastname);
  form_data.append('email',email);
  form_data.append('password',password);
  form_data.append('fonction','optimisateur');
  form_data.append('avatar',image)
  return axios.post(API_URL+'users/',{username:username,first_name:firstname,last_name:lastname,email:email,password:password,fonction:fonction})
  .then(async(response)=>{
    console.log("inserted");
//    await axios.post(API_URL+'profile/?id='+response.data["id"]) // removed for reducing inscription 
  });
}
const get_token= (username,password)=>{
  return axios.post(API_URL + 'api-token-auth/',{username,
    password}).then(response=>{
      localStorage.setItem("token",JSON.stringify(response.data))
    });
}
const logout = () => {
  try{
  localStorage.removeItem("user");
  }catch{
    console.log("no user in local storage");
  }
};

const authService = {
  login,
  signin,
  logout,
};

export default authService;