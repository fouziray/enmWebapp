import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  Popper,Fade,Paper,
  CardActions,
  CardHeader,
  AvatarGroup,
  Divider,
  Grid,
  IconButton,Typography,
  List,Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  ListItemButton
} from '@mui/material';

import * as React from 'react';
export const OverviewLatestProducts = (props) => {

  const { products = [],sx } = props;

  const {saveSelectedPosition= null}= props;
  console.log("hawlik products f groups ", saveSelectedPosition);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [groupusersPopper, setGroupusersPopper] = React.useState();
  const [detailedGroupName, setDetailedGroupName] = React.useState();

  const refListGroups = React.useRef();
  const showSideDetailedMembers= (newPlacement,users,groupname) => (e)=> {
    console.log("hihiihi");
    setAnchorEl(e.currentTarget);
    //setAnchorEl(refListGroups);
    setOpen((prev) =>  placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    saveSelectedPosition(placement);
    setDetailedGroupName(groupname);
    setGroupusersPopper(users);

  }

  const RenderUsersInPopper =() =>{
    console.log()
    return (
      <>
      {groupusersPopper.map(function(user){
            console.log(user);
            <div>hihihi</div>
          })}
          
      </>
    )
  }
  const handleCardItemClick= (id) =>{
  }
  
  return (
  <div> 
   <Grid container  spacing={2}   justifyContent="center">
   <Grid item
            xs={12}
            md={6}
            lg={6}
          >
    <Card sx={sx}>
      <CardHeader title="Drive Test Teams" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(product.updatedAt);
          console.log("hiaha",product.image);
          return (
            <ListItemButton ref={refListGroups}
              divider={hasDivider}
              key={product.id}
              onClick={showSideDetailedMembers(product.id,product.users,product.name)}
              selected={placement === product.id}
              disablePadding
            >
              <Grid container justifyContent="left" spacing={5}>
              <Grid item xs={12} md={3}>
              <ListItemAvatar >
                {
                  product.image
                    ? (<>
                      
                      <AvatarGroup max={4}>
                        {product.image.map(function(item, index){
                          return (<Avatar alt="44" src={"http://localhost:8000/static/"+item} />
                          );
                        })}
                      </AvatarGroup>
                      </>

                    )
                    : (
                      <Box
                          sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar></Grid>
              <Grid item xs={6} md={6}>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Active ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              </Grid>
              </Grid>
              <IconButton onClick={showSideDetailedMembers(product.id,product.users,product.name)} edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      
    </Card></Grid> {open?    <Grid item
            xs={12}
            md={6}
            lg={6}
          >
 
   
   <Card sx={sx}>
      <CardHeader title={"members of "+detailedGroupName} />
      <List>
          {groupusersPopper.map(function(user,index){
            const hasDivider = index < user.length - 1;
          
            console.log("user",index);
            return( <>
            <ListItem
              divider={hasDivider}
              key={user.id}
            >
              <Grid container justifyContent="left" spacing={2}>
  <Grid item xs={6} md={2}><Avatar alt={user.name} src={"http://localhost:8000/static/"+user.avatar} />
  </Grid>
  <Grid item xs={6} md={4}>
     <ListItemText
                primary={user.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`active ${ user.last_login ? formatDistanceToNow(new Date(user.last_login)): ''} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
  </Grid></Grid>
             
            </ListItem>
            <Divider/>
            </>
            )
          })}</List>      <Divider />
      
    </Card></Grid>: <></>}</Grid>
  </div>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
