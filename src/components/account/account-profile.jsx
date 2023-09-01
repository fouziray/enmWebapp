import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useRef } from 'react';

const now = new Date();



export const AccountProfile = (props) => {
  const {user}= props;
  const {callback}= props;
  const [image,setImage]=React.useState(null); 
  const handleImageChange=(e)=>{
    setImage(e.target.files[0]);
    console.log("iagenae",image);
  }

  const [preview, setPreview] = React.useState(user ? "http://localhost:8000"+user.avatar.avatar : "http://localhost:8000"+JSON.parse(localStorage.getItem("avatar")).avatar)
  useEffect(() => {
          if (!image) {
              setPreview(undefined)
              return
          }
  
          const objectUrl = URL.createObjectURL(image)
          setPreview(objectUrl)
          callback(image);

          // free memory when ever this component is unmounted
          return () => URL.revokeObjectURL(objectUrl)
      }, [image])
  
  
  return(
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={preview ? preview : "http://localhost:8000"+JSON.parse(localStorage.getItem("avatar")).avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.first_name} {user.last_name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.username} 
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {
          formatDistanceToNow( new Date(user.last_login).getTime())
          + " since last connection" } 
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
        component="label"
      >
        Upload picture
        <input
        onChange={handleImageChange}
        id="image"
    type="file"
    hidden
  />

      </Button>
    </CardActions>
  </Card>
)};
