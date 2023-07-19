import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './card.css';
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';
import Thumbs from "@/pages/MessageContent/card/actionsIcons";
import {  useNavigate } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const formatDate = (date ) => {
  let year, month, day;

  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  
  month = month.toString().padStart(2, 0);
  day = day.toString().padStart(2, 0);
  
  return `${day}/${month}/${year}`;
}

// Use current date without passing in
export default function BasicCard(props) {
  const navigate=useNavigate();  
  const [avatarsource,setAvatar]=useState("src/assets/avatar1.jpg");
  var TimestampAsdate=new Date( props.timestamp*1000);
  var ddmmyyyy = formatDate(TimestampAsdate);
  var hhmm=TimestampAsdate.getHours().toString() + ":" + TimestampAsdate.getMinutes();

  
   
  const showAlert = () => {
        //alert("I'm an alert");
  navigate('/messages/'+props.sender_id);
  }
    
     return (
    <Grid container spacing={2} className="">
        <Grid xs={6} md={1} className="">
        <Avatar id={props.id} alt="avatar" src={avatarsource} />
          <div className='v1  '></div>
        </Grid>
        <Grid xs={6}  className=" message-card w-fit">
    <Card onClick={showAlert} style={{"backgroundColor": "transparent", "border":"none","boxShadow":"none"}}>
      <CardContent>
        {props.message && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.message}
        </Typography>}
        <Typography variant="body2">{props.text}
        </Typography>
      </CardContent>
      <CardActions style={{ width: '100%', justifyContent: 'space-between' }}>
      <Typography sx={{ fontSize: 12 }} color="text.secondary" > {ddmmyyyy} {hhmm}
        </Typography>
        <div className="flex-row flex" style={{justifyContent: 'center'}}>
        <Thumbs></Thumbs>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" className="badgeLang" >
           en
        </Typography>
        </Box>
        </div>
       
        
      </CardActions>
    </Card>
    </Grid>
</Grid>
  );
}