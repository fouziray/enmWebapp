import React, { useEffect, useState } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { CompanyCard } from '@/sections/companies/company-card';
import { CompaniesSearch } from '@/sections/companies/companies-search';
import { useDispatch, useSelector  } from "react-redux";
import { homeMessages, selectMessage, selectMessageLoad } from '@/features/message/messageSlice.js';
import { sitesTech, selectSites, selectSitesLoad } from '@/features/site/siteSlice.js';

const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Medium Corporation',
    downloads: '625'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Slack',
    downloads: '857'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Lyft',
    downloads: '406'
  }
];


function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

function Page (){
  const dispatch = useDispatch();
  //const  {message}  = useSelector((state) => state.message);
  const sites = useSelector(selectSites);
  const sitesLoading= useSelector(selectSitesLoad);
  const handleSites = () => {
    //const { username, password } = {username, password};
            //setLoading(true);
    //const creds= { 'username':'helper101', 'password':'helper' };
    dispatch(sitesTech()); 
  };

  useEffect(()=>{
     handleSites();

    console.log(sites);
  },[]
    );
    useEffect(()=>{
    
     setCurrentSites(sites)
     console.log("sites");
   },[sites]
     );


const chunkedSites = sliceIntoChunks(companies,3);
const [currentSites,setCurrentSites]=useState(sites)
const [page, setPage] = useState(1);
const handleChange = (event, value) => {
  setCurrentSites(chunkedSites[page-1])
  setPage(value);
};
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
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Companies
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <CompaniesSearch />
          <Grid
            container
            spacing={3}
          >
            {currentSites.map((company) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={company.id}

              >
                <CompanyCard company={company} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>);
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;