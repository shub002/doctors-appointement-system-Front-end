import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007BFF" }}>
          {doctor.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Specialty: {doctor.specialization}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          {doctor.experience} years of experience
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 20, textTransform: "none" }}
          onClick={() => onBook(doctor)} // Pass the doctor object to the parent
        >
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
