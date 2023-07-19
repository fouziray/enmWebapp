import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, Grid } from '@mui/material';
import Routing from './routes/Routing';
import SideBar from  './components/sidebar/sideBar.jsx';
function App() {
  return (   
    
    <BrowserRouter>
    <Grid  container spacing={2}>

    <Grid xs={6} md={1}>
      <div className="flex">
      <SideBar/>
      </div>
      </Grid>
      <Grid xs={6} md={11}>
      <CssBaseline />
      <Routing />
      </Grid>
      </Grid>
    </BrowserRouter>
   

  );
}

export default App;
