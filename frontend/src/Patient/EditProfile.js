import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { useAuthContext } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

const API_ENDPOINT = "http://localhost:8567/api/patients/";


const EditProfile = () => {

  const { currentUser, setCurrentUser, userId, role } = useAuthContext(); // Destructure the methods and variables you need from the context
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [format, setFormat] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMUIDateChange = (date) => {
    setDateOfBirth(date.toDate().toISOString().split('T')[0]);
  };

  useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setFormat(dayjs(currentUser.dateOfBirth));
    setPhone(currentUser.phone);
    setEmail(currentUser.email);
    
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create the JSON object
    const patientData = {
        ...currentUser,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      phone: phone,
      email: email,
    };
    //console.log(patientData);

    try {
      const response = await axios.put(API_ENDPOINT+currentUser.patientId, patientData);
      if (response.status === 200) {
        toast.success('Your account has been updated!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        setCurrentUser(response.data); // Update the currentUser in the context
        setLoading(false);
        navigate('/patient-dashboard'); // Navigate to the patient dashboard
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: 'Email or phone already in use!',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#3d96ff',
      })
    }
  };


  return (
    <Wrapper>
        <Container>
        <Typography variant="h5" align="center">
            Edit Profile
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
                      value={format}
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
            
                <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={loading}
                    sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '100%', mt: 2 }}
                >
                    Update
                </LoadingButton>
            
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


export default EditProfile;
