import { useCallback } from 'react';
//import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
//import { useAuth } from 'src/hooks/use-auth';
import {useNavigate } from 'react-router-dom';
import { logout, selectIsLoggedIn, selectUser } from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";

export const AccountPopover = (props) => {
  const dispatch = useDispatch();

  const { anchorEl, onClose, open } = props;
  //const router = useRouter();
 // const auth = useAuth();

  const handleSignOut = ()=>{

      //onClose?.();
      //auth.signOut();
      //router.push('/auth/login');
      dispatch(logout());
      navigate('/login');
  }; 

  const navigate = useNavigate();  

  const gotoDetails=()=>{
    navigate("/userDetails");
  };
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
           My Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          { localStorage.getItem("username") ? localStorage.getItem("username") : '' }
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
        <MenuItem  onClick={  gotoDetails }>
        Account informations
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
