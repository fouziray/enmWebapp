import axios from 'axios';
const API_URL = 'http://localhost:8000/';
const config = {
  headers: { Authorization: localStorage.getItem("token") ? 'Token '+JSON.parse(localStorage.getItem("token")).token : '' }
};
const sites = async (_) => {
  const response = await axios
    .get(_ ? _ : API_URL + 'sites/',config);
   /* .then((res) => { //this resolves the request here and no further in the slice
      console.log(res.data) 
    })
    .catch(err => {
      console.log(err.response.data)
    })*/
  return response.data;
};
const get_sites_last_session= async () =>{
  const response= await axios.get(API_URL+'sites/lastsession/',config);
  return response.data;
}

const create_site = async (values) => {
  const response = await axios
    .post(API_URL + 'sites/',values,config);
   /* .then((res) => { //this resolves the request here and no further in the slice
      console.log(res.data) 
    })
    .catch(err => {
      console.log(err.response.data)
    })*/
  return response.data;
};
const siteService = {
  sites,
  create_site,
  get_sites_last_session,
};

//export  { messages };
export default siteService;