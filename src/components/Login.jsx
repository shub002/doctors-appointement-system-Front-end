// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = ({ isLoginPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLoginPage
        ? 'http://localhost:5000/api/users/login'
        : 'http://localhost:5000/api/users/register';
  
      const response = await axios.post(url, { email, password });
  
      if (isLoginPage) {
        // Destructure with a different variable name to avoid conflict with global 'name'
        const { user: { name: userName, email: userEmail }, token } = response.data;
  
        sessionStorage.setItem("userName", userName); // Store userName in sessionStorage
        sessionStorage.setItem("userEmail", userEmail); // Store email in sessionStorage
        sessionStorage.setItem("authToken", token); // Optionally, store the token
  
        alert('Login successful!');
        navigate('/'); // Redirect to HomePage after successful login
      } else {
        alert('Registration successful! Please log in now.');
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
        <Typography variant="h5">{isLoginPage ? 'Login' : 'Register'}</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
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
                {isLoginPage ? 'Login' : 'Register'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent="center" sx={{ marginTop: '10px' }}>
          {isLoginPage ? (
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Register
            </Button>
          ) : (
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
