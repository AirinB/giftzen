import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Link,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { useAuth } from '../contexts/AuthContext';
import { useAlerts } from '../contexts/AlertsContext';

const theme = createTheme();

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordCheck: '',
};

const validators = {
  firstName: (value) => {
    if (!value) {
      return 'First name is required';
    }
    if (value.length < 2) {
      return 'First name must be at least 2 characters';
    }
    return null;
  },
  lastName: (value) => {
    if (!value) {
      return 'Last name is required';
    }
    if (value.length < 2) {
      return 'Last name must be at least 2 characters';
    }
    return null;
  },
  email: (value) => {
    if (!value) {
      return 'Email is required';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address';
    }
    return null;
  },
  password: (value) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return null;
  },
  passwordCheck: (value, values) => {
    if (!value) {
      return 'Password confirmation is required';
    }
    if (value !== values.password) {
      return 'Password confirmation must match password';
    }
    return null;
  },
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ ...defaultValues });
  const [errors, setErrors] = useState({});

  const { signup } = useAuth();
  const { setMessage } = useAlerts();

  const validateField = (field) => (value) => {
    const error = validators[field](value || values[field], values);
    setErrors({ ...errors, [field]: error });
    return error;
  };

  const handleFieldChange = (field) => (event) => {
    const newValues = { ...values, [field]: event.target.value };
    setValues(newValues);
    setTimeout(() => validateField(field)(newValues[field]), 0);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const localErrors = Object.keys(values)
      .map((key) => validateField(key)())
      .filter(Boolean);
    if (localErrors.length) {
      return;
    }

    try {
      await signup(values);
      setMessage('Account created successfully', 'success');
      navigate('/category/valentines');
    } catch (e) {
      setMessage('Failed to create an account', 'error');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleFieldChange('firstName')}
                  value={values.firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleFieldChange('lastName')}
                  value={values.lastName}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleFieldChange('email')}
                  value={values.email}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleFieldChange('password')}
                  value={values.password}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-check"
                  label="Password Check"
                  type="password"
                  id="password-check"
                  autoComplete="new-password"
                  onChange={handleFieldChange('passwordCheck')}
                  value={values.passwordCheck}
                  error={!!errors.passwordCheck}
                  helperText={errors.passwordCheck}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" component={RouterLink}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
