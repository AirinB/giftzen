import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid, Link,
  TextField
} from '@mui/material';
import {useAuth} from "../../contexts/AuthContext";

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const AccountProfileDetails = (props) => {
  const {updateUser, currentUser} = useAuth();
  const [newName, setNewName] = useState(currentUser.displayName);
  const [values, setValues] = useState({
    firstName: currentUser.displayName,
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log("handleSubmit ", newName);
      updateUser(newName);
    } catch(e) {
      console.log(e.message);
    }

  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setNewName(event.target.value)
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled
                required
                value={values.email}
                variant="outlined"
              />
              <Link>Change Email Adress</Link>
            </Grid>
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={6}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <TextField*/}
            {/*    fullWidth*/}
            {/*    label="Phone Number"*/}
            {/*    name="phone"*/}
            {/*    onChange={handleChange}*/}
            {/*    type="number"*/}
            {/*    value={values.phone}*/}
            {/*    variant="outlined"*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={6}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <TextField*/}
            {/*    fullWidth*/}
            {/*    label="Country"*/}
            {/*    name="country"*/}
            {/*    onChange={handleChange}*/}
            {/*    required*/}
            {/*    value={values.country}*/}
            {/*    variant="outlined"*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
