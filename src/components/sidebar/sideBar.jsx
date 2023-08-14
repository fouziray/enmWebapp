import { BsPlus, BsFillLightningFill } from 'react-icons/bs';
import { FaFire, FaPoo,FaLifeRing } from 'react-icons/fa';
import './sideBar.css';
import {  IconButton, Avatar } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { changeMode, selectMode } from '@/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { usePopover } from '@/hooks/use-popover';

import { AccountPopover } from '@/components/account-popover';

const SideBar = () => {
  const accountPopover = usePopover();

  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const navigate=useNavigate();  
  const navigateHome=()=>{
    navigate("/");
  }
  const navigateMessages=()=>{
    navigate("/sites");
  }
  const navigateNewMessage=()=>{
    navigate("/drivetest");
  }
  const navigateHelpTesters=()=>{
    navigate("/chat")
  }
    return (
      <div className=" drop-shadow-md fixed top-0 left-0 h-screen w-16 m-0
                      flex flex-col 
                      bg-white text-white shadow-lg">
       <SideBarIcon text="Home" click={navigateHome}icon={<FaFire size="28" />} />
       <SideBarIcon text="New Drive test session" click={navigateNewMessage} icon={<BsPlus size="32" />} />
       <SideBarIcon text="Sites" click={navigateMessages} icon={<BsFillLightningFill size="20" />} />
       <SideBarIcon text="Help testers !"  click={navigateHelpTesters} icon={<FaLifeRing size="20" />} />
       <SideBarIcon text="account"  icon={<Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.avatar?.avatar : "/assets/avatars/avatar-anika-visser.png" }
            />} />

       
            

      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

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