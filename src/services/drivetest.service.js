import axios from 'axios';
const API_URL = 'http://localhost:8000/';
const config = {
  headers: { Authorization: localStorage.getItem("token") ? 'Token '+JSON.parse(localStorage.getItem("token")).token : '' }
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
const getprofileAvatar= async (userid)=>{
  const response = await axios.get(API_URL+ 'profile/'+'?id='+userid)
  return response.data;
}

const dtSessionsFiltered= async (props) =>{
  props.technician_id ? console.log("this is tech") : console.log('this is not technician')
  
  const response = await axios.get(API_URL+ 'dtsession/g='+props.group_id+ (props.technician_id ? '&t='+props.technician_id : '')+'/',config);
  var tempresponse=JSON.parse(JSON.stringify(response.data));
  
  console.log(response.data);
  response.data = await Promise.all(response.data.map(async (item) => {
    item.avatar=await getprofileAvatar(item.technicien.id ? item.technicien.id : item.technicien );
    return item;
  }));
  return response.data;

}

const technicianUsers= async ()=>{
  const response = await axios.get(API_URL+ 'helpproviders/!technician/',config);
  return response.data;

};
const siteHasSession= async (siteid)=>{
  const response = await axios.get(API_URL+'has_session/'+siteid,config);
  console.log('Site has session '+response.data);

  return response.data;
};
const create_session = async (values) => {
  const response = await axios
    .post(API_URL + 'dtsession/',values,config);
  return response.data;
};

const statsDash= async ()=>{
  const response= await axios.get(API_URL+'stats/');
  return response.data;
}

const todayssessions=async ()=>{
  const response= await axios.get(API_URL+'dtsession/today/',config);
  return response.data;
}


const driveTestService = {
  usersPerGroups,
  dtSessions,
  technicianUsers,
  siteHasSession,
  dtSessionsFiltered,
  create_session,
  statsDash,
  todayssessions
};

//export  { messages };
export default driveTestService;