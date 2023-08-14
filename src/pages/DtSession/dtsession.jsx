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
  Divider,
  Typography,
  StepButton,
  Step,
  StepLabel,
  Stepper,
  IconButton,
  CircularProgress,
  Unstable_Grid2 as Grid
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import PropTypes from 'prop-types';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import GroupsIcon from '@mui/icons-material/Groups';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { useDispatch, useSelector  } from "react-redux";
import { sitesTech, selectSites, selectSitesLoad } from '@/features/site/siteSlice.js';
import { dtSessions, selectDtSessions, selectDtSessionsLoad, selectDtsessionsRejected,selectCreatedDtSessions, create_dtSession } from '@/features/driveTest/dtSessionSlice.js';
import { technicianUsers, selectTechnicianUsers, selectTechnicianUsersLoad} from '@/features/driveTest/technicianUsersSlice.js';
import { usersPerGroups, selectUsersGroups, selectUsersGroupsLoad } from '@/features/driveTest/usersPerGroupsSlice.js';
import { filteredSession, selectFilteredSession, selectFilteredSessionLoad } from '@/features/driveTest/filterSessionSlice.js';
import { hasDtSessions, selectHasDtSessions, selectHasDtSessionsLoad } from '@/features/driveTest/hasDtSessionSlice.js';
import { OverviewLatestGroups } from '@/components/overview-latest-groups';
import { OverviewTechnicians } from '@/components/sections/overview/overview-technicians';
import { subDays, subHours } from 'date-fns';
import { ArrowForwardIos } from '@mui/icons-material';
import { blue,grey } from '@mui/material/colors';
import Scheduler from '@/components/schedulingDt/scheduler';
const ColorIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[100]),
  backgroundColor: grey[100],
  'box-shadow': '0 4px 6px -6px black',
  '&:hover': {
    backgroundColor: blue[50],
  },
}));



const steps = ['Select drive test team','Select drive tester', 'Create a schedule'];
function Page (){
  const now = new Date();

  const dispatch = useDispatch();
  //const  {message}  = useSelector((state) => state.message);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sites = useSelector(selectSites);
  const sitesLoading= useSelector(selectSitesLoad);

  const dtsessions=useSelector(selectDtSessions);
  const dtSessionsLoading= useSelector(selectDtSessionsLoad);

  const usersgroups=useSelector(selectUsersGroups);
  const usersgroupsLoading= useSelector(selectUsersGroupsLoad);

  const technicians=useSelector(selectTechnicianUsers);
  const techniciansLoading= useSelector(selectTechnicianUsersLoad);
  
  const filteredsessions= useSelector(selectFilteredSession);
  const filteredsessionsLoading= useSelector(selectFilteredSessionLoad);

  const hasdtsession=useSelector(selectHasDtSessions);
  const hasdtsessionLoading= useSelector(selectHasDtSessionsLoad);
  const [hasdtsessionsstate,setHasdtsessionsstate]=React.useState(hasdtsession);
  const handleSites = () => {
    //const { username, password } = {username, password};
            //setLoading(true);
    //const creds= { 'username':'helper101', 'password':'helper' };
    dispatch(sitesTech('http://localhost:8000/sites/all/')); 
    dispatch(usersPerGroups());
    dispatch(dtSessions());
    dispatch(technicianUsers());
  };

  useEffect(()=>{
     handleSites();
    
  },[]
    );
    useEffect(()=>{
     setCurrentSites(sites)
   },[sites]
     );
  var groupes = {
      groups: [],
      grp: []
  };     
  var usersingroup = {
    users:[]
  }
  var jsonar={}
  var jsonarTime={}
  var groupnames={}
  const [groupsitems,setGroupsItems]= useState([]);
  useEffect(()=>{
    if (!usersgroupsLoading && usersgroups){
       
    
      for(var i in usersgroups[0]) {    
      
          var item = usersgroups[0][i];  
          /*
          usersingroup.group=item.groups__id
          usersingroup.users.push({id: item.id, avatar: item.profile_avatar  })
          */
          var val=jsonar[item.groups__name]
          if (val != undefined) {
            jsonar[item.groups__name].push({id:item.id, avatar: item.profile__avatar, name: item.first_name+" "+item.last_name, last_login: item.last_login});
          }else {
            jsonar[item.groups__name]=[];
            jsonar[item.groups__name].push({id:item.id, avatar: item.profile__avatar, name: item.first_name+" "+item.last_name, last_login: item.last_login})
          }
          groupnames[item.groups__name]=item.groups__id

         
          
          groupes.groups.push({ 
            id: item.groups__id+i,
            image: '/assets/products/product-5.png',
            name: item.groups__name,
            updatedAt: subDays(subHours(now, 1), 1).getTime(),
            [item.groups__id]: item.groups__name

          });
      }
      for ( var i in usersgroups[1]){
        var item= usersgroups[1][i];
        var val=jsonarTime[item.groups__name]
        jsonarTime[item.groups__name]=item.maxlast;
          
      }
      const items = Object.keys(jsonar).map(function(key) {
        console.log("hoo2o",jsonar[key],key)
        const aa=jsonar[key].map(function(item, index){ return item.avatar})
        groupes.grp.push({ 
          id: groupnames[key],
          image: aa,
          name: key,
          updatedAt: new Date(jsonarTime[key]),
          users: jsonar[key]

        });
        return jsonar[key];
    });
      setGroupsItems(groupes.grp);
      console.log("hee",jsonar)
      console.log("hooo",jsonar['dt_team'])
     }
  },[usersgroupsLoading])
const [currentSites,setCurrentSites]=useState(sites)
const [sitesLoadingState,setSitesLoadingState]=useState(sitesLoading)
const [page, setPage] = useState(1);

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
const [reset, setReset]=React.useState(false);
const [activeStep, setActiveStep] = React.useState(0);
const [completed, setCompleted] = React.useState({});
const [schedulerState, setSchedulerState] = React.useState(filteredsessions ? filteredsessions : /*dtsessions ? dtsessions :*/ []);
const [sessionsToPost,setSessionsToPost]=React.useState([]);
const handleSchedulerStateChange=(schedulerstate)=>{
  console.log(schedulerstate,"hehehehehehe");

  setSchedulerState(schedulerstate.data);
  
  setSessionsToPost(schedulerstate.addedData);
} 
const handleHasSession=(site_id)=>{ 
  console.log("hehehe");
  dispatch(hasDtSessions(site_id));
  
  return hasdtsession
};
useEffect(()=>{
    setHasdtsessionsstate(hasdtsession);

},[hasdtsessionLoading]);
const [selectedTechnician, setSelectedTechnician]= React.useState(null);
const [selectedTeam,setSelectedTeam]=React.useState(null);
const handleSelectedTeam=(selectedteam)=>{
  setSelectedTeam(selectedteam);
}
const handleTechnicianSelected= (selectedtechnician) =>{
  
  setSelectedTechnician(selectedtechnician);
  console.log("position saved ",selectedtechnician);
  
}

useEffect(()=>{
  if(selectedTeam && selectedTechnician){ 
      dispatch(filteredSession({group_id: selectedTeam, technician_id: selectedTechnician}));
      if(!filteredsessionsLoading) {
        console.log("setting scheduler data state",filteredsessions);
        setSchedulerState(filteredsessions);
       /* setSchedulerState(state => state.filter(function(value,index,arr){
          return !filteredsessions.includes(value) 
      })
      );*/ 
      console.log("setSchedulerState(state => filteredsessions",schedulerState,filteredsessions);
      } /*else {
        setSchedulerState(state => state.filter(function(value,index,arr){
            return !filteredsessions.includes(value)
           
        })
        
        );
      console.log("been in else of filtering", schedulerState);
      }*/
    }

},[selectedTeam,selectedTechnician,reset]);
useEffect(()=>{
  if(!filteredsessionsLoading) {
    console.log("setting scheduler data state 2 ",filteredsessions);
    setSchedulerState(filteredsessions);
  }
},[filteredsessionsLoading]);

const totalSteps = () => {
  return steps.length;
};

const completedSteps = () => {
  return Object.keys(completed).length;
};

const isLastStep = () => {
  return activeStep === totalSteps() - 1;
};

const allStepsCompleted = () => {
  
  return completedSteps() === totalSteps();
};

const handleNext = () => {
  const newActiveStep =
    isLastStep() && !allStepsCompleted()
      ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
  setActiveStep(newActiveStep);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleStep = (step) => () => {
  setActiveStep(step);
};
useEffect(()=>{
  console.log("All steps completed",sessionsToPost);

  if(allStepsCompleted() ){
    console.log("All steps completed",sessionsToPost);
    dispatch(create_dtSession(sessionsToPost));
};
},[activeStep]);
const handleComplete = () => {
  const newCompleted = completed;
  newCompleted[activeStep] = true;
  setCompleted(newCompleted);
  handleNext();
};

const handleReset = () => {
  setActiveStep(0);
  setCompleted({});
  setReset(state => !state);
};
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <GroupsIcon />,
    2: <EngineeringIcon />,
   // 2: <CellTowerIcon />,
    3: <ScheduleIcon />,
    
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
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
        <Stack spacing={3}  direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
             <Typography variant="h4">
                Drive Test Sessions
              </Typography>
        
         
        </Stack>
        <Divider variant="middle" />
        <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)} >
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - Drive test session Planned !
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}

            </Typography>
          {   (activeStep==0) ? (!usersgroupsLoading ? <><OverviewLatestGroups
              products={groupsitems} onSelectedTeam={handleSelectedTeam} currentSelectedTeam={selectedTeam}
              
            /> </> : <CircularProgress/> ):
             (  activeStep==1 ? ( !techniciansLoading ? <OverviewTechnicians  products={technicians} onTechnicianSelected={handleTechnicianSelected} currentSelectedTechnician={selectedTechnician} 
              
            /> :<CircularProgress/> )  : ( activeStep==2  ? ( !dtSessionsLoading ? <Scheduler currentSelectedTechnician={selectedTechnician} currentSelectedTeam={selectedTeam} onSchedulerStateChange={handleSchedulerStateChange} data={schedulerState} date={now} sites={currentSites} onHasSession={handleHasSession} hasdtsession={hasdtsessionsstate}/>  :<CircularProgress/>):<CircularProgress/>))}

       
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <ColorIconButton
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >                <ArrowBackIosIcon/>

              </ColorIconButton>
              <Box sx={{ flex: '1 1 auto' }} />
              
              <ColorIconButton onClick={handleNext} sx={{ mr: 1, boxShadow: 3  }}>
                <ArrowForwardIosIcon/>
              </ColorIconButton>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <ColorIconButton  onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ?<DoneAllIcon/>
                      : <DoneIcon/>}
                  </ColorIconButton>
                ))}
            </Box>
          </React.Fragment> 
        )}
      </div>
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
