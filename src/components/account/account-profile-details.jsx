import { useCallback, useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import userService from '@/services/user.service.js';
const functions = [
  {
    value: 'optimisation',
    label: 'Optimisation'
  },
  {
    value: 'integration',
    label: 'Integration RAN'
  }
];

export const AccountProfileDetails = (props) => {
  const { user }= props;
  const { image } = props;
  const [values, setValues] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: '',
    state: 'los-angeles',
    username: user.username,
  });
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );
  
  const firstname = useRef(null);
  const lastname = useRef(null);
  const email= useRef(null);
  const username= useRef(null);
  const reference = useRef(image);
  const fonction=useRef(null);
  useEffect(()=>{
    console.log("hz",image,reference);
  },[image]);
  const handleProfileUpdate=async (e) =>  {
    e.preventDefault();

    const FirstName = firstname.current.value.replace(/\s+/g, '');
    const LastName = lastname.current.value.replace(/\s+/g, '');
    const Email = email.current.value.replace(/\s+/g, '');
    const Username= username.current.value.replace(/\s+/g, '');
    const Fonction= fonction.current.value.replace(/\s+/g, '');
    const CurrentImage=reference.current;
    const Id=user.id;
    if (FirstName === '') {
      // 'Please enter name.'
      firstname.current.focus();
    } else if (LastName === '') {
      // 'Please enter surname.'
      lastname.current.focus();
    } else if (Email === '') {
      // 'Please enter email.'
      email.current.focus();
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{1,20}$/.test(Email)) {
      // 'Please enter real email.'
      email.current.focus();
    } else if (Fonction === '') {
      fonction.current.focus();
  }else if (Username===''){
      username.current.focus();
  }else{
    console.log("sweeweel",CurrentImage,image);
   
    userService.setProfilePicture({id:Id,username:Username,first_name:FirstName,last_name:LastName,email:Email,fonction:Fonction, avatar: image });
  };
}
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  inputRef={firstname}
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  inputRef={lastname}
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  inputRef={email}
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  inputRef={username}
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  inputRef={fonction}
                  fullWidth
                  label="Select job function"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {functions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleProfileUpdate}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
