import axios from 'axios';
const API_URL = 'http://localhost:8000/';
const config = {
  headers: { Authorization: `Token ad76a4c1c0ce826e319eb392a1849f3b0ccf2a5b` }
};
const usersPerGroups = async () => {
  const response = await axios
    .get(API_URL + 'useringroups/',config);
   /* .then((res) => { //this resolves the request here and no further in the slice
      console.log(res.data) 
    })
    .catch(err => {
      console.log(err.response.data)
    })*/
  return response.data;
};
const dtSessions= async () => {
  const response = await axios.get(API_URL+ 'dtsession/',config);
  return response.data;
};

const dtSessionsFiltered= async (group_id) =>{
  const response = await axios.get(API_URL+ 'dtsession/'+group_id,config);
  return response.data;

}

const technicianUsers= async ()=>{
  const response = await axios.get(API_URL+ 'helpproviders/!technician/',config);
  return response.data;

}
const create_session = async (values) => {
  console.log("hello i'm creating site"+ values)
  const response = await axios
    .post(API_URL + 'useringroups/',values,config);
   /* .then((res) => { //this resolves the request here and no further in the slice
      console.log(res.data) 
    })
    .catch(err => {
      console.log(err.response.data)
    })*/
  return response.data;
};
const driveTestService = {
  usersPerGroups,
  dtSessions,
  technicianUsers,
  create_session
};

//export  { messages };
export default driveTestService;