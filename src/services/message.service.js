import axios from 'axios';
const API_URL = 'http://localhost:8000/';
const config = {
  headers: { Authorization: `Token ad76a4c1c0ce826e319eb392a1849f3b0ccf2a5b` }
};
const messages = async () => {
  const response = await axios
    .get(API_URL + 'event/',config);
   /* .then((res) => { //this resolves the request here and no further in the slice
      console.log(res.data) 
    })
    .catch(err => {
      console.log(err.response.data)
    })*/
  return response.data;
};

const messageService = {
  messages,
};

//export  { messages };
export default messageService;