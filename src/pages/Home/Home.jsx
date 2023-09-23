import React from 'react';
import { Typography, Stack, Container } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
//---- new elements 
import { subDays, subHours } from 'date-fns';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { OverviewBudget } from '@/components/sections/overview/overview-budget';
import { OverviewLatestOrders } from '@/components/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from '@/components/sections/overview/overview-latest-products';
import { OverviewSales } from '@/components/sections/overview/overview-sales';
import { OverviewTasksProgress } from '@/components/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from '@/components/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from '@/components/sections/overview/overview-total-profit';
import { OverviewTraffic } from '@/components/sections/overview/overview-traffic';
import driveTestService from "@/services/drivetest.service.js";
import  { useEffect, useState } from 'react';

const now = new Date();
 
function Page() {
  const [stats,setStats]=useState(null);
  const [todaysSessions,setTodaysSessions]= useState(null);
  const callstats= async()=>{
    await driveTestService.statsDash().then(reponse=> {setStats(reponse)});
    await driveTestService.todayssessions().then(reponse=> {
      reponse.map(item =>{
        item.image=item.avatar;
        item.name= item.title;
        item.updatedAt=Date.parse(item.startDate);
        

      }
       );
       console.log("reponse",reponse)

      
      setTodaysSessions(reponse)
    }
    );
  }
 useEffect( ()=>  {
  callstats();
  },[]);
  
  return(
  <>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
      <Stack
  direction="row"
  justifyContent="space-between"
  spacing={4}
>
  <Stack spacing={1}>
    <Typography variant="h4">
      Drive test Stats
    </Typography>
    <Stack
      alignItems="center"
      direction="row"
      spacing={1}
    >

    </Stack>
  </Stack>
 
</Stack>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={6}
          >{ stats ? <OverviewBudget
              difference={stats.percentage}
                positive={stats.percentage > 100 ? true : false}  

              sx={{ height: '100%' }}
              value={stats.lastweek}
            /> : null }
            
          </Grid>
     
          <Grid
            xs={12}
            sm={6}
            lg={6}
          >
            { stats ?
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={Math.round(stats.taskProgress)}
            /> : null
          }
          </Grid>
         
         
          <Grid
            xs={12}
            md={6}
            lg={6}
          >{stats ?   <OverviewTraffic
              chartSeries={[stats.testsPerUOP[0].number, stats.testsPerUOP[1].number, stats.testsPerUOP[2].number]}
              labels={['SOUTH', 'EAST', 'CENTER']}
              sx={{ height: '100%' }}
            />
: null}
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={6}
          >{todaysSessions ?
            <OverviewLatestProducts
              products={todaysSessions}
              sx={{ height: '100%' }}
            /> : null 
          }
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>);
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


//export default Home;

export default Page;
