import React, { useEffect, useState } from 'react';
import { Typography, Stack, Container, CircularProgress } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
import BasicCard from './card/card';
import {conversationDetail, selectConversation, selectConversationLoading } from '@/features/conversation/conversationSlice';
import { useDispatch, useSelector  } from "react-redux";
import {useParams} from 'react-router-dom';
//import Xarrow, {Xwrapper} from "react-xarrows";
function ConversationContent() {
  const dispatch = useDispatch();
  const params = useParams();
  //const  {message}  = useSelector((state) => state.message);
  const conversation = useSelector(selectConversation);
  const isConversationLoading= useSelector(selectConversationLoading);
  const handleMessages = () => {
    dispatch(conversationDetail(params.id));
  };

  useEffect(()=>{
     handleMessages();
    //console.log(conversation);
    
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
      <Xwrapper>
      <Stack className='bg-white  p-8 rounded-xl drop-shadow-md' spacing={2}>
        {conversation.map((event,index)=>(<BasicCard key={index} id={index} text={event.data.text} timestamp={event.timestamp} source="@/assets/avata1.jpg"   ></BasicCard>))}
        { isConversationLoading && <CircularProgress /> }
       

      
    </Stack>
    </Xwrapper>
      <TemplateTester />
      <Counter />
    </Container>
    
   
  );
}

export default ConversationContent;
