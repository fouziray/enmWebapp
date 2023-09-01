import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box,Chip ,  Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import { formatDistanceToNow } from 'date-fns';
import { deepPurple, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const SiteCard = (props) => {
  const { company, lastsessions } = props;

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: deepPurple['800'],
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
const  searchsite= () =>{
  if(lastsessions){
    for (var i=0;i<lastsessions.length;i++){
      if(lastsessions[i]['site']=== company.site_id)
        return lastsessions[i]
    }
  }
  return null;
}  
const accent = deepPurple['800']; // #e040fb
  
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
      <Typography
          align="left"
          gutterBottom
          variant="h6"
        >
{(company.UOP?.toUpperCase()==='CENTRE' | company.UOP?.toUpperCase()== 'CENTER' ) ?  <><Chip label={"CENTER"}  color={"success"} /></> : null}
{(company.UOP?.toUpperCase()==='SOUTH' ) ? <><Chip label={"SOUTH"}  color="success" /></>: null}
{(company.UOP?.toUpperCase()==='EAST' ) ?  <><Chip label={"EAST"}  sx={{color:"white",backgroundColor:"#15195A"}} /></>: null}

</Typography>

        <Box
          sx={{
            
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
        
          {(company.UOP?.toUpperCase()==='CENTRE' | company.UOP?.toUpperCase()== 'CENTER' ) ? <NorthIcon/> : null}
          {(company.UOP?.toUpperCase()==='SOUTH' ) ? <SouthIcon/> : null}
          {(company.UOP?.toUpperCase()==='EAST' ) ? <EastIcon/> : null}

        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.site_id}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.wilaya  }</Typography>
          <Stack   alignItems="center" direction="row" spacing={1}>

          { company.managedObject ?  company.managedObject.map((technology) => (
                     
                  <><Chip label={technology.type} variant="outlined" /></>
           
              
              
            )): ''}     </Stack> 
        
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            { searchsite() ? "last check "+formatDistanceToNow(new Date(searchsite().max)) : 'not tested yet' }
          </Typography>
        </Stack>
        
      </Stack>
    </Card>
  );
};

SiteCard.propTypes = {
  company: PropTypes.object.isRequired
};
