import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DoctorCard from "../components/DoctorCard";
import AppointmentBooking from "../components/AppointmentBooking";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
    };

    fetchDoctors();
  }, []);

  const handleClose = () => setSelectedDoctor(null);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: 4, color: "#007BFF" }}>
        Our Doctors
      </Typography>
      <Grid container spacing={4}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <DoctorCard doctor={doctor} onBook={setSelectedDoctor} />
          </Grid>
        ))}
      </Grid>

      {/* Appointment Booking Dialog */}
      <Dialog open={!!selectedDoctor} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedDoctor ? `Book Appointment with ${selectedDoctor.name}` : "Select a Doctor"}
        </DialogTitle>
        <DialogContent>
          {selectedDoctor && <AppointmentBooking doctor={selectedDoctor} onClose={handleClose} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorsPage;
