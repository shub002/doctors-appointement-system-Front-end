// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Appointment-related state
  const [patientName, setPatientName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [editingDoctorId, setEditingDoctorId] = useState(null);  // State to track which doctor is being edited
  const [editingAppointmentId, setEditingAppointmentId] = useState(null); // State to track which appointment is being edited

  // Dialog visibility states
  const [openDoctorDialog, setOpenDoctorDialog] = useState(false);
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);

  // Fetch all doctors from the API
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetch all appointments from the API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Add a new doctor via POST request
  const handleAddDoctor = async () => {
    const newDoctor = { name: doctorName, specialization, experience, contact };
    try {
      await axios.post('http://localhost:5000/api/doctors', newDoctor);
      alert('Doctor added successfully');
      setDoctorName('');
      setSpecialization('');
      setExperience('');
      setContact('');
      fetchDoctors(); // Re-fetch the doctors list
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  // Update doctor via PUT request
  const handleUpdateDoctor = async () => {
    const updatedDoctor = { name: doctorName, specialization, experience, contact };
    try {
      await axios.put(`http://localhost:5000/api/doctors/${editingDoctorId}`, updatedDoctor);
      alert('Doctor updated successfully');
      setOpenDoctorDialog(false);  // Close the dialog
      fetchDoctors(); // Re-fetch the doctors list
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  // Delete doctor via DELETE request
  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      alert('Doctor deleted successfully');
      fetchDoctors(); // Re-fetch the doctors list
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  // Add a new appointment via POST request
  const handleAddAppointment = async () => {
    const newAppointment = { patientName, doctorId, date, time };
    try {
      await axios.post('http://localhost:5000/api/appointments', newAppointment);
      alert('Appointment added successfully');
      setPatientName('');
      setDoctorId('');
      setDate('');
      setTime('');
      fetchAppointments(); // Re-fetch the appointments list
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  // Update appointment via PUT request
  const handleUpdateAppointment = async () => {
    const updatedAppointment = { patientName, doctorId, date, time };
    try {
      await axios.put(`http://localhost:5000/api/appointments/${editingAppointmentId}`, updatedAppointment);
      alert('Appointment updated successfully');
      setOpenAppointmentDialog(false);  // Close the dialog
      fetchAppointments(); // Re-fetch the appointments list
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  // Delete appointment via DELETE request
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      alert('Appointment deleted successfully');
      fetchAppointments(); // Re-fetch the appointments list
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Fetch data on page load
  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Get doctor name from doctorId
  const getDoctorNameById = (doctorId) => {
    // doctorId is an object containing the doctor's details in appointment data
    return doctorId ? doctorId.name : 'Unknown Doctor';
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      {/* Add Doctor Section */}
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>Add New Doctor</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Doctor Name"
              variant="outlined"
              fullWidth
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Specialization"
              variant="outlined"
              fullWidth
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Experience"
              variant="outlined"
              fullWidth
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact"
              variant="outlined"
              fullWidth
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddDoctor}
            >
              Add Doctor
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* View Doctors Section */}
      <Typography variant="h6" gutterBottom>View All Doctors</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => {
                    setEditingDoctorId(doctor._id);
                    setDoctorName(doctor.name);
                    setSpecialization(doctor.specialization);
                    setExperience(doctor.experience);
                    setContact(doctor.contact);
                    setOpenDoctorDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteDoctor(doctor._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Doctor Dialog */}
      <Dialog open={openDoctorDialog} onClose={() => setOpenDoctorDialog(false)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Doctor Name"
            variant="outlined"
            fullWidth
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Specialization"
            variant="outlined"
            fullWidth
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Experience"
            variant="outlined"
            fullWidth
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Contact"
            variant="outlined"
            fullWidth
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDoctorDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateDoctor}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* View Appointments Section */}
      <Typography variant="h6" gutterBottom>View All Appointments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{getDoctorNameById(appointment.doctorId)}</TableCell> {/* Display Doctor Name */}
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => {
                    setEditingAppointmentId(appointment._id);
                    setPatientName(appointment.patientName);
                    setDoctorId(appointment.doctorId);
                    setDate(appointment.date);
                    setTime(appointment.time);
                    setOpenAppointmentDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteAppointment(appointment._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Appointment Dialog */}
      <Dialog open={openAppointmentDialog} onClose={() => setOpenAppointmentDialog(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
        {/* <TextField
            label="Doctor Name"
            variant="outlined"
            fullWidth
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            sx={{ marginBottom: 2 }}
            
          /> */}
          <TextField
            label="Patient Name"
            variant="outlined"
            fullWidth
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date"
            variant="outlined"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Time"
            variant="outlined"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAppointmentDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateAppointment}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
