import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_ENDPOINT = "http://localhost:8567/api/patients/";


const PatientForm = () => {

  const { currentUser, setCurrentUser, userId } = useAuthContext(); // Destructure the methods and variables you need from the context
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleMUIDateChange = (date) => {
    setDateOfBirth(date.toDate().toISOString().split('T')[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create the JSON object
    const patientData = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      phone: phone,
      email: email,
      userId: userId,
    };

    try {
      const response = await axios.post(API_ENDPOINT, patientData);
      if (response.status === 201) {
        setCurrentUser(response.data); // Update the currentUser in the context
        navigate('/patient-dashboard'); // Navigate to the patient dashboard
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };


  return (
    <Wrapper>
        <Container>
        <Typography variant="h5" align="center">
            Patient Details
        </Typography>
        <Form onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    inputProps={{ style: { textTransform: 'none' } }}
                />
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    inputProps={{ style: { textTransform: 'none' } }}
                />
                </FormControl>
            
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <DatePicker
                      value={null}
                      onChange={handleMUIDateChange}
                      label="Date of Birth"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                </LocalizationProvider>
            
                <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="tel"
                    type='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputProps={{ style: { textTransform: 'none' } }}
                />
                </FormControl>
            
                <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ style: { textTransform: 'none' } }}
                />
                </FormControl>
            
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{marginTop: '5px', backgroundColor:"#3d96ff"}}
                >
                Submit
                </Button>
            
        </Form>
        </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 100px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default PatientForm;
