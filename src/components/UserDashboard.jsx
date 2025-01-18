import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent, Button, Box } from "@mui/material";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch("http://localhost:5000/api/appointments");
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  // Function to handle canceling an appointment
  const cancelAppointment = async (_id) => {
    try {
      // Send DELETE request to the server to cancel the appointment
      await fetch(`http://localhost:5000/api/appointments/${_id}`, {
        method: "DELETE",
      });

      // Update the state to remove the canceled appointment from the list
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== _id) // Fix here
      );

      alert("Appointment canceled successfully");
    } catch (error) {
      alert("Failed to cancel the appointment");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: 4, color: "#007BFF" }}>
        My Appointments
      </Typography>

      <Grid container spacing={4}>
        {appointments.map((appt) => (
          <Grid item xs={12} sm={6} md={4} key={appt._id}> {/* Change key to _id */}
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007BFF" }}>
                  {appt.doctorName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {new Date(appt.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                  Time: {new Date(appt.date).toLocaleTimeString()}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button variant="contained" color="primary" sx={{ borderRadius: 20, textTransform: "none" }}>
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ borderRadius: 20, textTransform: "none" }}
                    onClick={() => cancelAppointment(appt._id)} // Fix here
                  >
                    Cancel Appointment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserDashboard;
