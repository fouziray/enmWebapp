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
import UserDetail from '@/pages/accountInfo/account.jsx';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';


function Routing() {

  const getLayout = (<Sites/>).getLayout ?? ((page) => page);
   
  return (
    <Routes>
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<Register />} />
      
      <Route path="*" element={<DashboardLayout><><SideBar/><Home /></></DashboardLayout>} />
    
      <Route path="/chat/" element={<DashboardLayout><><SideBar/><ChatApp/></></DashboardLayout>} />
      <Route path="/sites" element={<><SideBar/><Sites/></>}/>
      <Route path="/userDetails" element={<><SideBar/><UserDetail /></>}/>
      <Route path="/drivetest" element={<DashboardLayout><><SideBar/><Dtest/></></DashboardLayout>} />

    </Routes>
  );
}

export default Routing;
