import React, { useEffect, useState } from 'react';
import { Typography, Stack, Container, CircularProgress } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
import BasicCard from './card/card';
import { homeMessages, selectMessage, selectMessageLoad } from '@/features/message/messageSlice.js';
import {conversationDetail, selectConversation, selectConversationLoading } from '@/features/conversation/conversationSlice.js';
import { useDispatch, useSelector  } from "react-redux";
import { login } from '@/features/auth';
function MessageContent() {
  const dispatch = useDispatch();
  //const  {message}  = useSelector((state) => state.message);
  const message = useSelector(selectMessage);
  const messagesLoading= useSelector(selectMessageLoad);
  const handleMessages = () => {
    //const { username, password } = {username, password};
            //setLoading(true);
    //const creds= { 'username':'helper101', 'password':'helper' };
    dispatch(homeMessages()); 
    dispatch(conversationDetail());
  };

  useEffect(()=>{
     handleMessages();
    console.log(message);
  },[]
    );




  return (

 <Container className='bg-slate-100'>
      <Stack gap={1} my={2}>
        <Typography textAlign="center" variant="h2">
          Viterjs-template
        </Typography>
        <Typography textAlign="center" variant="subtitle1">
          React + Redux + MuI + Axios + ESlint + Prettier
        </Typography>
      </Stack>
      <Stack className='bg-white  p-8 rounded-xl drop-shadow-md' spacing={2}>
        {message.map((event,index)=>(<BasicCard key={index} id={index} source="@./assets/avata1.jpg" text={event.data.text} message={ event.action_name ? event.action_name : event.intent_name ? event.intent_name : 'hi' } sender_id={event.sender_id}  timestamp={event.timestamp}></BasicCard>))}
        { messagesLoading && <CircularProgress /> }
    </Stack>
      <TemplateTester />
      <Counter />
    </Container>
    
   
  );
}

export default MessageContent;
