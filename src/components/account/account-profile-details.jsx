import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const AccountProfileDetails = (props) => {
  const { updateUser, currentUser } = useAuth();
  const [newName, setNewName] = useState(currentUser.name);
  const [values, setValues] = useState({
    fullName: currentUser.name,
    email: currentUser.email,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log('handleSubmit ', newName);
      updateUser(newName);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
    setNewName(event.target.value);
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Full name"
                name="fullName"
                onChange={handleChange('fullName')}
                value={values.fullName}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled
                required
                value={values.email}
                variant="outlined"
                onChange={handleChange('email')}
              />
              <Link>Change Email Adress</Link>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
