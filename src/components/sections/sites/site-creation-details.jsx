import { useCallback, useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Slide,
  Autocomplete,
  Paper,
  List,
  ListItemText,ListItem,IconButton,Collapse,

  Unstable_Grid2 as Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group';
import wilaya from "./wilaya.json";
import { useDispatch, useSelector  } from "react-redux";
import { sitesCreationTech, selectCreatedSite, selectCreatedSiteLoad } from '@/features/site/siteCreationSlice.js';
const states = [
  {
    value: 'CENTER',
    label: 'Center'
  },
  {
    value: 'EAST',
    label: 'East'
  },
  {
    value: 'SOUTH',
    label: 'South'
  }
];
const technos = [
  {
    value: '2G',
    label: '2G'
  },
  {
    value: '3G',
    label: '3G'
  },
  {
    value: '4G',
    label: '4G'
  }
];

function renderItem({ item, handleRemoveTech }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveTech(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}
export const SiteCreationDetailsPopper = () => {
    const dispatch = useDispatch();

  const sitetemplate={
  site_id: '112',
  wilaya: "Jijel",
  UOP:"EAST",
  sitetech:"2G"
}
  const [values, setValues] = useState({});
  const [checked, setChecked] = useState(false);
const templatevalue={
  firstName: 'Anika',
  lastName: 'Visser',
  email: 'demo@devias.io',
  phone: '',
  state: 'los-angeles',
  country: 'USA'
}



const [techsInBasket, setTechsInBasket] = useState([]);

const handleAddTech = () => {
  const nextHiddenItem = values.techtype;
  if (nextHiddenItem && !techsInBasket.includes(nextHiddenItem) && nextHiddenItem!="default" ) {
    setTechsInBasket((prev) => [nextHiddenItem, ...prev]);
  }
};

const handleRemoveTech = (item) => {
  setTechsInBasket((prev) => [...prev.filter((i) => i !== item)]);
};

const addTechButton = (
  <Button
    variant="contained"
    disabled={techsInBasket.length >= technos.length}
    onClick={handleAddTech}
  >
    Add Technology
  </Button>
);
const wila=wilaya.wilayas

const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      console.log(values)
    }
  );
const handleWilayaChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        ["wilaya"]: event.target.value
      }));
      
    }
  );
  const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <Box  sx={{ display: 'flex', textAlign:"center", justifyContent:'center',alignItems: "center",width: 100, height: 100 }}>
        
      <Typography  align="center" variant="h5"  gutterBottom>
        Site Inserted
      </Typography>
      </Box>
    </Paper>
  );
  
  
  const handleSubmit = useCallback(
    (event) => {
      
      const te=techsInBasket.map(function(i){return { "type": i, "state":"ACTIVE"}})
      const st=JSON.stringify(Object.entries({site_id: values.site_id,wilaya: values.wilaya,UOP: values.UOP, managedObject: te}))
      values.managedObject=te
      localStorage.setItem("userData", values);
      event.preventDefault();
      dispatch(sitesCreationTech(values))
      .unwrap()
      .then(() => {
        setChecked((prev) => !prev);
        console.log("finally made it !"+selectCreatedSite)
    })
      .catch(() => {
        console.log("error !")
        //setLoading(false);
      });
    }
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      {checked ? <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          {icon}
        </Slide> : <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Site Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the site's identifying code"
                  label="Identifier"
                  name="site_id"
                  onChange={handleChange}
                  required

                  value={values.site_id}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={wila}
                sx={{ width: 300 }}
                name="wilaya" 
                inputValue={values.wilaya}
                onInputChange={(event, newInputValue)=>{      setValues((prevState) => ({
                  ...prevState,
                  ["wilaya"]: newInputValue
                }));
          }}
                renderInput={(params) => <TextField {...params}  label="Wilaya" />}
              />
              </Grid>
             
            
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Select UOP"
                  name="UOP"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.UOP}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select technology type"
                  name="techtype"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.techtype}
                >
                  <option key="8" value={null} >{"default"}</option>
                  {technos.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
              </Grid>
<Grid xs={12} md={6}>
<div>
      {addTechButton}
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {techsInBasket.map((item) => (
              <Collapse key={item}>
                {renderItem({ item, handleRemoveTech })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
</Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>}
    </form>
  );
};
