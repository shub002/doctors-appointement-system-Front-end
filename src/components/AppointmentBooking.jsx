import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentBooking = ({ doctor, onClose }) => {
  const [date, setDate] = useState(new Date()); // Default to today's date
  const [time, setTime] = useState(""); // Time input
  const [patientName, setPatientName] = useState(""); // Patient name input

  const handleSubmit = async () => {
    // Create the JSON object to send
    const appointment = {
      doctorId: doctor._id,           // Doctor ID from props
      doctorName: doctor.name,       // Doctor name from props
      patientName: patientName,      // Input from the patient name field
      date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      time: time,                    // Input from the time field
    };

    console.log(appointment)

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        toast.success("Appointment booked successfully!");
        onClose(); // Close the dialog after booking
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Failed to book appointment.");
    }
  };

  return (
    <Box sx={{ p: 3, minWidth: "300px" }}>
      <ToastContainer />
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Book an appointment with {doctor.name}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
        Specialty: {doctor.specialty}
      </Typography>

      {/* Patient Name Input */}
      <TextField
        label="Your Name"
        variant="outlined"
        fullWidth
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)} // Update state for patient name
        sx={{ marginBottom: 2 }}
      />

      {/* Date Picker */}
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)} // Update state for date
        customInput={
          <TextField
            label="Select Date"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        }
        minDate={new Date()} // Disable past dates
        dateFormat="yyyy-MM-dd" // Format to YYYY-MM-DD
      />

      {/* Time Input */}
      <TextField
        label="Time (e.g., 10:00 AM)"
        variant="outlined"
        fullWidth
        value={time}
        onChange={(e) => setTime(e.target.value)} // Update state for time
        sx={{ marginBottom: 2 }}
      />

      {/* Submit and Cancel Buttons */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit} // Call handleSubmit on click
        sx={{ marginRight: 2, borderRadius: 20 }}
      >
        Confirm
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onClose} // Close the dialog on cancel
        sx={{ borderRadius: 20 }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default AppointmentBooking;
