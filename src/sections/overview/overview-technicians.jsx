import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
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
  const [placement, setPlacement] = React.useState();

  const handleSelection = (newPlacement) => (e)=> {
    setPlacement(newPlacement);
  }
  console.log("product haw wech fih",products);
    return (
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
              { product.profile__avatar ? <Avatar alt="44" src={"http://localhost:8000/static/"+product.profile__avatar} /> : <></>}
            
              <ListItemText justifyContent='center'
                primary={product.first_name + " " + product.last_name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
    </Card>
  );
};

OverviewTechnicians.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
