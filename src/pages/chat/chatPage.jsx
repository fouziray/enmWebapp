import { MainContainer,TypingIndicator,VoiceCallButton,VideoCallButton,InfoButton,Avatar, ConversationHeader,ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import { Typography, Stack, Container, CircularProgress } from '@mui/material';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';   
import React, { useEffect, useRef, useState } from 'react';
import ico from '@/assets/avatar1.jpg';
import './chatPage.css';
function ChatMessage() {
  
  const lastIdRef = useRef(0);
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  /*  creating a knob to scroll to bottom of message list */
  const msgListRef = useRef();
  const label = 'Scroll Behavior';
  const options = {
    Auto: "auto",
    Smooth: "smooth",
    None: undefined
  };
  //const scrollBehavior = select(label, options, undefined);



  const handleSend = message => {
    setMessages([...messages, {
      _id: `a-${lastIdRef.current}`,
      message,
      direction: 'outgoing', 
    }]);
    setMsgInputValue("");
    msgListRef.current.scrollToBottom();
    inputRef.current.focus();
  };
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
        <Stack className='bg-transparent  p-8 rounded-xl drop-shadow-md' spacing={2}>
       
        <div style={{
    height: "500px"
  }}>                
                        <ChatContainer >
                            <ConversationHeader>
                                <Avatar src={ico} name="Kai" />
                                <ConversationHeader.Content userName="Kai" info="Active 10 mins ago" />
                                <ConversationHeader.Actions>
                                    <VoiceCallButton />
                                    <VideoCallButton />
                                    <InfoButton />
                                </ConversationHeader.Actions>          
                                </ConversationHeader>
                                <MessageList ref={msgListRef} scrollBehavior="auto" typingIndicator={<TypingIndicator content="Emily is typing" />}>
                                  {messages.map(m => <Message  className="bg-black" key={m.id} model={m} />)}
                                </MessageList>
                                <MessageInput  placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
                      </ChatContainer>
                </div>;

      </Stack>
     
      </Container>
  


    
)
  }
  
  export default ChatMessage;
  