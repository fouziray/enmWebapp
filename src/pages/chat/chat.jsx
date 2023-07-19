import React, { useRef,useEffect, useState } from 'react';
import { Typography, Stack, Container, CircularProgress } from '@mui/material';
import { useDispatch, useSelector  } from "react-redux";
import {conversationDetail, selectConversation, selectConversationLoading } from '@/features/conversation/conversationSlice';

function Chat() {
  const dummy = useRef();

  const dispatch = useDispatch();

  const conversation = useSelector(selectConversation);
  const isConversationLoading= useSelector(selectConversationLoading);
  const handleMessages = () => {
    dispatch(conversationDetail('1d92da5044554c4882c0624bdbc68f7b'));
  };
  useEffect(()=>{
    handleMessages();
   //console.log(conversation);
   
 },[]);
 const [formValue, setFormValue] = useState('');
 const sendMessage = async (e) => {
  e.preventDefault();


  
conversation.push({
  "id": 285,
  "sender_id": "1d92da5044554c4882c0624bdbc68f7b",
  "type_name": "user",
  "timestamp": 1684415903.4806085,
  "intent_name": "greet",
  "action_name": null,
  "data": {
    "event": "user",
    "timestamp": 1684415903.4806085,
    "metadata": {
      "model_id": "053139dbff254c7aa3c774bc0d35782a",
      "assistant_id": "20230414-034917-merry-account"
    },
    "text": "hi",
    "parse_data": {
      "intent": {
        "name": "greet",
        "confidence": 0.3547062873840332
      },
      "entities": [],
      "text": "hi",
      "message_id": "59082a3cf81b4f018be85d6611db12c6",
      "metadata": {},
      "text_tokens": [
        [
          0,
          2
        ]
      ],
      "intent_ranking": [
        {
          "name": "greet",
          "confidence": 0.3547062873840332
        },
        {
          "name": "ask_time",
          "confidence": 0.08352063596248627
        },
        {
          "name": "affirm",
          "confidence": 0.07229765504598618
        },
        {
          "name": "deny",
          "confidence": 0.06230588257312775
        },
        {
          "name": "check_request",
          "confidence": 0.05349133908748627
        }
      ],
      "response_selector": {
        "all_retrieval_intents": [],
        "default": {
          "response": {
            "responses": null,
            "confidence": 0,
            "intent_response_key": null,
            "utter_action": "utter_None"
          },
          "ranking": []
        }
      }
    },
    "input_channel": "cmdline",
    "message_id": "59082a3cf81b4f018be85d6611db12c6"
  }
}

)
  setFormValue('');
  dummy.current.scrollIntoView({ behavior: 'smooth' });
}

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
      <main>

{conversation.map((event,index)=>(<ChatMessage key={index} message={event} />))}
        { isConversationLoading && <CircularProgress /> }
<span ref={dummy}></span>

</main>

<form onSubmit={sendMessage}>

<input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

<button type="submit" disabled={!formValue}>🕊️</button>

</form>

      
    </Stack>
   
    </Container>
    
   
  );
}
function ChatMessage(props) {
  const text= props.message.data.text;
  const uid= props.message.type_name;
  
  const messageClass = uid === 'user' ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={ 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

export default Chat;
