import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import MessageContent from '@/pages/MessageContent/MessageContent';
import ConversationContent from '@/pages/MessageContent/ConversationContent';
import ChatMessage  from '@/pages/chat/chatPage';
import ChatApp from '@/pages/chat/newchat/appchat';
import Sites from '@/pages/sites/sites';
import Dtest from '@/pages/DtSession/dtsession';
function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<Register />} />
      <Route path="/messages/" element={<MessageContent />} />
      <Route path="messages/:id" element={<ConversationContent />} />
      <Route path="/chat/" element={<ChatMessage/>} />
      <Route path="/newchat" element={<ChatApp />} /> 
      <Route path="/sites" element={<Sites/>}/>
      <Route path="/drivetest" element={<Dtest/>} />

    </Routes>
  );
}

export default Routing;
