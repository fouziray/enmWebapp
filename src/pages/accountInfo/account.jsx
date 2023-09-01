import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { AccountProfile } from '@/components/account/account-profile';
import { AccountProfileDetails } from '@/components/account/account-profile-details';
import { useDispatch, useSelector  } from "react-redux";
import {selectUser } from '@/features/auth';
import userService from '@/services/user.service';
import React, { useEffect, useRef, useState } from 'react';


const Page = () => {
  const user= useSelector(selectUser);
  const [currentImage,setCurrentImage ]=useState(user.avatar.avatar);
  
  const currentImageCallback =(image)=>{
      setCurrentImage(image);
      console.log("curent",image);
  }
  useEffect(()=>{
    setCurrentImage(user?.avatar.avatar);
  },[]);
  return (
  
  <>
      <title>
        Account | Devias Kit
      </title>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile user={user} callback={currentImageCallback}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails user={user} image={currentImage} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
