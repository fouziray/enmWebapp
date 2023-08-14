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
import SideBar from  '@/components/sidebar/sideBar.jsx';

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<><SideBar/><Home /></>} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<Register />} />
      <Route path="/chat/" element={<><SideBar/><ChatApp/></>} />
      <Route path="/sites" element={<><SideBar/><Sites/></>}/>
      <Route path="/drivetest" element={<><SideBar/><Dtest/></>} />

    </Routes>
  );
}

export default Routing;
