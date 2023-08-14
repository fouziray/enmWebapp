import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box,Chip ,  Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import { formatDistanceToNow } from 'date-fns';


export const SiteCard = (props) => {
  const { company, lastsessions } = props;
 
const  searchsite= () =>{
  if(lastsessions){
    for (var i=0;i<lastsessions.length;i++){
      console.log("hehehehe");
      if(lastsessions[i]['site']=== company.site_id)
        return lastsessions[i]
    }
  }
  return null;
}  
  
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
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
            { searchsite() ? formatDistanceToNow(new Date(searchsite().max)) : 'not tested yet' }
          </Typography>
        </Stack>
        
      </Stack>
    </Card>
  );
};

SiteCard.propTypes = {
  company: PropTypes.object.isRequired
};
