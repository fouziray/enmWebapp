import { Box, Stack, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import AuthOutlet from './AuthOutlet';
import AuthService from "@/services/auth.service";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function Register() {
  const ad = useRef(null);
  const soyad = useRef(null);
  const email = useRef(null);
  const number = useRef(null);
  const password = useRef(null);
  const passwordConf = useRef(null);
  const [image,setImage]=React.useState(null); 
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const FirstName = ad.current.value.replace(/\s+/g, '');
    const LastName = soyad.current.value.replace(/\s+/g, '');
    const Email = email.current.value.replace(/\s+/g, '');
    const Password = password.current.value.replace(/\s+/g, '');
    const pwdConf = passwordConf.current.value.replace(/\s+/g, '');
    if (FirstName === '') {
      // 'Please enter name.'
      ad.current.focus();
    } else if (LastName === '') {
      // 'Please enter surname.'
      soyad.current.focus();
    } else if (Email === '') {
      // 'Please enter email.'
      email.current.focus();
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{1,20}$/.test(Email)) {
      // 'Please enter real email.'
      email.current.focus();
    } else if (Password === '') {
      // 'Please enter password.'
      password.current.focus();
    } else if (pwdConf === '') {
      // 'Please enter password again.'
      passwordConf.current.focus();
    } else if (Password !== pwdConf) {
      // 'Passwords do not match.'
      password.current.focus();
    } else if (Password.length < 6) {
      // 'Password must be at least 6 characters.'
      password.current.focus();
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(Password)
    ) {
      // 'Password must contain at least one uppercase letter, one lowercase letter and one number.',
      password.current.focus();
    } else {
      // do register stuff
    
      const data = await AuthService.signin(FirstName, FirstName, LastName, Email, Password, 'optimisateur',image).then((t)=>{navigate('/login')}).catch((reaseon) =>{
              email.current.focus();
      });
    }
  };
  const handleImageChange=(e)=>{
    setImage(e.target.files[0]);
    console.log("iagenae",image);
  }
  /** Focus name input when component mounted. */
  useEffect(() => {
    ad.current.focus();
  }, []);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <AuthOutlet header={"Drive test assist"}>
      <Stack direction="row" gap={3} sx={{ alignItems: 'center' }}>
        <TextField
          inputRef={ad}
          label="Name"
          type="text"
          variant="outlined"
          autoComplete="off"
        />
        <TextField
          inputRef={soyad}
          label="Surname"
          type="text"
          variant="outlined"
          autoComplete="off"
        />
      </Stack>
      <TextField
        inputRef={email}
        type="email"
        label="E-mail"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        inputRef={number}
        type="text"
        label="Phone number"
        variant="outlined"
        autoComplete="off"
      />
            <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="optimisateur" control={<Radio />} label="optimisateur" />
        <FormControlLabel value="integrateur" control={<Radio />} label="integrateur" />
       
      </RadioGroup>
      <TextField
        inputRef={password}
        type="password"
        autoComplete="new-password"
        label="Password"
        variant="outlined"
      />
      <TextField
        inputRef={passwordConf}
        hidden
        type="password"
        autoComplete="new-password"
        label="Password (again)"
        variant="outlined"
      />

<Button variant="contained" component="label"
>
        Import Photo
        <input
        onChange={handleImageChange}
        id="image"
    type="file"
    hidden
  />
      </Button>
      <Button variant="contained" onClick={registerHandler}>
        Sign Up
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" component="p">
          Alredy have an account?
        </Typography>
        <Link
          variant="body2"
          sx={{ display: 'inline', ml: 1 }}
          onClick={() => navigate('/login')}
        >
          Sign In
        </Link>
      </Box>
    </AuthOutlet>
  );
}

export default Register;
