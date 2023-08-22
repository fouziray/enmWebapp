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
  const callstats= async()=>{
    await driveTestService.statsDash().then(reponse=> {console.log("55555555555",reponse);setStats(reponse)})
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
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
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
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
