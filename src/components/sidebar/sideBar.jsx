import { BsPlus, BsFillLightningFill } from 'react-icons/bs';
import { FaFire, FaPoo,FaLifeRing } from 'react-icons/fa';
import './sideBar.css';
import {  IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { changeMode, selectMode } from '@/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';

const SideBar = () => {

  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const navigate=useNavigate();  
  const navigateHome=()=>{
    navigate("/");
  }
  const navigateMessages=()=>{
    navigate("/messages");
  }
  const navigateNewMessage=()=>{
    navigate("/chat");
  }
    return (
      <div className=" drop-shadow-md fixed top-0 left-0 h-screen w-16 m-0
                      flex flex-col 
                      bg-white text-white shadow-lg">
       <SideBarIcon text="Home" click={navigateHome}icon={<FaFire size="28" />} />
       <SideBarIcon text="New Message" click={navigateNewMessage} icon={<BsPlus size="32" />} />
       <SideBarIcon text="Recent Messages" click={navigateMessages} icon={<BsFillLightningFill size="20" />} />
       <SideBarIcon text="Help" icon={<FaLifeRing size="20" />} />
       
      </div>
    );
  };

  const SideBarIcon = ({ icon,text = 'tooltip 💡', click='' }) => (
    <div onClick={click} className="sidebar-icon group">
      {icon}

      <span class="sidebar-tooltip group-hover:scale-100 ">
        {text}
      </span>
    </div>
  );
  export default SideBar;