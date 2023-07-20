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
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group';
import wilaya from "./wilaya.json";
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
export const AccountProfileDetails = () => {
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
const sitetemplate={
  site_id: '112',
  wilaya: "jijel",
  UOP:"EAST",
  Technologies:[{
    type: '2G',
    state: 'ACTIVE'
  },
  {
    type:'3G',
    state: 'ACTIVE'
  }
  ]
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
    },
    [values]
  );

  const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <Box component="svg" sx={{ width: 100, height: 100 }}>
        <Box
          component="polygon"
          sx={{
            fill: (theme) => theme.palette.common.white,
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1,
          }}
          points="0,100 50,00, 100,100"
        />
      </Box>
    </Paper>
  );
  
  
  const handleSubmit = useCallback(
    (event) => {
/*      dispatch(createSite({ values }))
      .unwrap()
      .then(() => {
  
      
    })
      .catch(() => {
        //setLoading(false);
      });*/
      localStorage.setItem("userData", JSON.stringify(values));
      setChecked((prev) => !prev);
      console.log("heheh"+values.wilaya)

      event.preventDefault();
    },
    []
  );
  const ref0 = useRef();
  return (
    <form
      autoComplete
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
                  name="siteCode"
                  onChange={handleChange}
                  required

                  value={values.firstName}
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
                name="wilaya" value={values.wilaya}
                onInputChange={(e, v, r) => {
                  const ev = e.target;
                  if (r === "reset") console.log(ev, v, r);
                }}
                onChange={(e, v, r) => {
                  console.log(ref0.current.getAttribute("name"));
                }}
          
                renderInput={(params) => <TextField {...params}  name="wilaya" value={values.wilaya} label="Wilaya" />}
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
                  value={values.state}
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
