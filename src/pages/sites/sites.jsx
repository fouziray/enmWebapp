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
  Modal,
  Typography,
  CircularProgress,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { SiteCard } from '@/components/sections/sites/site-card';
import { CompaniesSearch } from '@/components/sections/sites/companies-search';
import { useDispatch, useSelector  } from "react-redux";
import { sitesTech, selectSites, selectSitesLoad, selectNextPreviousPageUrl, selectPreviousPageUrl } from '@/features/site/siteSlice.js';
import { SiteCreationDetailsPopper } from '@/components/sections/sites/site-creation-details';
import CSVReader from '@/components/CSVReader';
import {getSitesLastSession,selectSitesLastSessions,selectSitesLastSessionsLoad} from '@/features/site/siteSlice';



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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sites = useSelector(selectSites);
  const sitesLoading= useSelector(selectSitesLoad);
  const previousNextUrls=useSelector(selectNextPreviousPageUrl);
  const previousPageUrl=useSelector(selectPreviousPageUrl);
  const handleSites = (_) => {
    //const { username, password } = {username, password};
            //setLoading(true);
    //const creds= { 'username':'helper101', 'password':'helper' };
    dispatch(sitesTech(_)); 
  };
const [page, setPage] = useState(1);

const lastdatepersite=useSelector(selectSitesLastSessions);
const lasdatepersiteLoading=useSelector(selectSitesLastSessionsLoad);
  useEffect(()=>{

     handleSites();
     setSitesLoadingState()
    console.log(sites);
  },[]
    );
    useEffect(()=>{
     setCurrentSites(sites)
     dispatch(getSitesLastSession());
   },[sites]
     );
  

const chunkedSites = sliceIntoChunks(sites,3);
const [currentSites,setCurrentSites]=useState(sites)
const [sitesLoadingState,setSitesLoadingState]=useState(sitesLoading)


const handleChange = (event, value) => {
  setCurrentSites(chunkedSites[page-1])
  handleSites( (value > page ) ? previousNextUrls : (value < page)?  previousPageUrl: null );

  setPage(value);
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '30px',
  p: 4,
};
  return(
  <>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <SiteCreationDetailsPopper/>
        </Box>
      </Modal>
    </div>
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
                Sites
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <CSVReader />

              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                onClick={handleOpen}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <CompaniesSearch />       

          {sitesLoading ?  <CircularProgress /> : (<Grid
            container
            spacing={3}
          >
            {currentSites==null ? '' : currentSites.map((site) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={site.id}
              >
                <SiteCard company={site} lastsessions={!lasdatepersiteLoading && lastdatepersite ? lastdatepersite : null} />
              </Grid>
            ))}
          </Grid>)}
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
