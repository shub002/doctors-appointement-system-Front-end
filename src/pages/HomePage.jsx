// src/pages/HomePage.jsx
import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const GradientBackground = styled(Box)({
  background: "linear-gradient(to right, #1e3c72, #2a5298)",
  height: "100vh",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 20px",
});

const FeatureCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  color: "#fff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
});

const HomePage = () => {
  const navigate = useNavigate();

  // Retrieve user data from sessionStorage
  const userName = sessionStorage.getItem("userName");
  const userEmail = sessionStorage.getItem("userEmail");

  return (
    <GradientBackground>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Welcome to Doctor's Appointment System
      </Typography>
      
      {/* Display logged-in user details */}
      {userName && userEmail ? (
        <Typography variant="h6" sx={{ mb: 4 }}>
          Hello, {userName} ({userEmail})
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ mb: 4 }}>
          Please log in to see your details.
        </Typography>
      )}

      <Typography variant="h6" sx={{ maxWidth: "600px", mb: 4, opacity: 0.9 }}>
        Experience a seamless way to book appointments with top-rated doctors, manage your health records, and take control of your well-being.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#00C853",
          color: "#fff",
          padding: "12px 30px",
          fontSize: "18px",
          borderRadius: "30px",
          ":hover": { backgroundColor: "#009624" },
        }}
        onClick={() => navigate("/doctors")}
      >
        Get Started
      </Button>

      {/* Features Section */}
      <Box sx={{ mt: 8, width: "100%" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Book Appointments
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                  Easily schedule appointments with the best doctors near you.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Health Records
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                  Manage and access your medical history anytime, anywhere.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Reminders
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                  Get timely notifications for your upcoming appointments.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>
    </GradientBackground>
  );
};

export default HomePage;
