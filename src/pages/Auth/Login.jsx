import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Link,
  IconButton,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import AuthOutlet from './AuthOutlet';
import { login, selectIsLoggedIn, selectUser } from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Login() {
  const userinfo=useSelector(selectUser);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const dispatch = useDispatch();
  const handleLogin=() => {
      navigate('/profile');   
  }
  const [loggedUi,setLoggedUi]=useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(isLoggedIn )
      handleLogin();
  },[isLoggedIn]);

  const loginHandler = async (e) => {
      e.preventDefault();
    const user = email.current.value.replace(/\s+/g, '');
    const pwd = password.current.value.replace(/\s+/g, '');
    if (user === '') {
      // Please enter your email.
      email.current.focus();
    } else if (pwd === '') {
      // 'Please enter your password.'
      password.current.focus();
    } else {
      // do login stuff
        
        handleLogIn(user,pwd);
       // handleLogin();
 
    }
  };
  const handleLogIn = (username,password) => {
    //const { username, password } = {username, password};
            //setLoading(true);
    dispatch(login({ username, password }))
      .then((re) => {
        setLoggedUi(true);
        localStorage.setItem("admin",payload.user.admin);

        if(!re.payload.user.admin){
          handleClickOpen();
        }
        console.log("------------------",re.payload.user.admin,re.payload.user.staff);
        localStorage.setItem("user", JSON.stringify(userinfo))
/*        if(isLoggedIn)
          handleLogin("/profile");
          setLoggedUi(True);*/
      
    })
      .catch(() => {
        email.current.focus();
        //setLoading(false);
      });

 
  };

  /** Focus email input when component mounted. */
  useEffect(() => {
    email.current.focus();
  }, []);

  return (
    <AuthOutlet header={"Drive Test Assist"}>
 
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You're a tester "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You don't have staff's permission to access this site.
          please use mobile app for authentication
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        inputRef={email}
        type="text"
        label="Username"
        variant="outlined"
        autoComplete="off"
      />
      <Stack gap={1}>
        <TextField
          inputRef={password}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          sx={{ '& .MuiInputBase-root ': { pr: '4px' } }}
          autoComplete="new-password"
          InputProps={{
            // <-- This is where the toggle button sis added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />        <Box sx={{ height:'10px' }}/>


        <Button variant="contained" onClick={loginHandler}>
          Sign in
        </Button>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" component="p">
          You don't have an account?
        </Typography>
        <Link
          variant="body2"
          sx={{ display: 'inline', ml: 1 }}
          onClick={() => navigate('/register')}
        >
          Register
        </Link>
      </Box>
    </AuthOutlet>
  );
}

export default Login;
