// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Registration URL
      const url = 'http://localhost:5000/api/users/register';

      // Send the POST request for registration
      const response = await axios.post(url, {name, email, password });

      alert('Registration successful! Please log in now.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      // Handle errors: display error message
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
        <Typography variant="h5">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: '10px' }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent="center" sx={{ marginTop: '10px' }}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
