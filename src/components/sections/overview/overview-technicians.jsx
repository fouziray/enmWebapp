import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,Grid,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import * as React from 'react';

export const OverviewTechnicians = (props) => {
  const { products = [], sx } = props;
  const [placement, setPlacement] = React.useState(props.currentSelectedTechnician);
  const { onTechnicianSelected = null}= props;
  const handleSelection = (newPlacement) => (e)=> {
    setPlacement(newPlacement);
    onTechnicianSelected(newPlacement);

  }
    return (
      <Grid container  spacing={2}   justifyContent="center">
   <Grid item
            xs={12}
            md={6}
            lg={6}
          >
    <Card sx={sx}>
      <CardHeader title="Choose technician" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(new Date(product.last_login));

          return (
            <ListItemButton
              divider={hasDivider}
              key={product.id}
              onClick={handleSelection(product.id)}
              selected={placement===product.id}
              
            >
              <Grid container justifyContent="left" spacing={5}>
              <Grid item xs={12}  md={2}
            lg={2} >

              { product.profile__avatar ? <Avatar alt="44" src={"http://localhost:8000/static/"+product.profile__avatar  } /> : <> <Avatar alt="44" src={"http://localhost:8000/static/"+"profile_images/default.jpg"  } /> </>}
              </Grid><Grid item xs={12}  md={6}
            lg={6}>

              <ListItemText 
                primary={product.first_name + " " + product.last_name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </Grid></Grid>
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
    </Card>
    </Grid></Grid>
  );
};

OverviewTechnicians.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
