import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, FormControl, MenuItem } from '@mui/material';
import { useAuthContext } from '../context/auth_context';
import axios from 'axios';


const AddDoctor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  const {currentUser} = useAuthContext();
  const API = 'http://localhost:8567/api/'

  const departments = [
    {
      value: 'CARDIAC & VASCULAR SURGERY',
      label: 'Cardiac & Vascular Surgery',
    },
    {
      value: 'CARDIOLOGY (INTERVENTIONAL)',
      label: 'Cardiology (Interventional)',
    },
    {
      value: 'COLORECTAL & LAPAROSCOPIC SURGERY',
      label: 'Colorectal & Laparoscopic Surgery',
    },
    {
      value: 'DERMATOLOGY',
      label: 'Dermatology',
    },
    {
      value: 'DIABETES',
      label: 'Diabetes',
    },
    {
      value: 'ENDOCRINOLOGY',
      label: 'Endocrinology',
    },
    {
      value: 'ENT, HEAD & NECK SURGERY',
      label: 'ENT, Head & Neck Surgery',
    },
    {
      value: 'GASTROENTEROLOGY',
      label: 'Gastroenterology',
    },
    {
      value: 'HYPERTENSION',
      label: 'Hypertension',
    },
    {
      value: 'INTERNAL MEDICINE',
      label: 'Internal Medicine',
    },
    {
      value: 'NEURO SURGERY',
      label: 'Neuro Surgery',
    },
    {
      value: 'NEUROMEDICINE',
      label: 'Neuromedicine',
    },
    {
      value: 'ORTHOPEDICS',
      label: 'Orthopedics',
    },
    {
      value: 'RESPIRATORY MEDICINE',
      label: 'Respiratory Medicine',
    },
    {
      value: 'UROLOGY',
      label: 'Urology',
    },
  ];
  
  const error = null;

  const doPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password && password.length >= 8 && doPasswordsMatch()) {
        try {
            // Register the user
            const userResponse = await axios.post(API+'auth/register', {
                username: username,
                password: password,
                role: 'ROLE_DOCTOR'
            });

            const userId = userResponse.data;

            // Register the doctor with the received userId
            await axios.post(API+'doctors', {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                department: department,
                hospitalId: currentUser.hospitalId
            });

            // Prepare the email data
            const emailData = {
                to: email,
                from: "medikey.health@gmail.com",
                subject: "Account Created",
                name: `${firstName}`,
                role: 'Doctor',
                username: username,
                password: password 
            };

            // Send the email
            await axios.post(API+'mail/sendingEmail', emailData);

            // Success alert
            Swal.fire({
                title: 'Success',
                text: 'Doctor Added and Email Sent!',
                icon: 'success',
                confirmButtonColor: '#3D96FF',
                confirmButtonText: 'Done',
                heightAuto: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    nav('/hospital-dashboard'); // Replace with the desired path
                }
            });
        } catch (error) {
            // Error alert for the email sending failure
            if (error.response && error.response.data) {
                Swal.fire({
                    title: 'Error',
                    text: `Failed to send email: ${error.response.data.message}`,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#3D96FF',
                    heightAuto: true,
                });
            } else {
                // General error alert
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to add doctor',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#3D96FF',
                    heightAuto: true,
                });
            }
        }
    } else {
        // Error alert message if any of the required fields are missing or invalid
        if (!username) setMessage("Please enter a username!");
        else if (!password) setMessage("Please enter a password!");
        else if (password.length < 8) setMessage("Password must be at least 8 characters long!");
        else if (!doPasswordsMatch()) setMessage("Passwords do not match!");
    }
};



  useEffect(() => {
    if(error){
      setMessage("Invalid Credentials")
    }
  }, [error, setMessage])

  useEffect(() => {
    setMessage('');
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Register Doctor</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }
        <Form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              id="username"
              label="Doctor Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <StyledRow>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="password"
                name="password"
                variant="outlined"
                required
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
                
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="password"
                name="confirmPassword"
                variant="outlined"
                required
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
          </StyledRow>

          <StyledRow>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="text"
                name="firstName"
                variant="outlined"
                required
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="text"
                name="lastName"
                variant="outlined"
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
          </StyledRow>

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              select
              label="Department"
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              inputProps={{MenuProps: {disableScrollLock: true}}}
            >
              {departments.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="tel"
              name="phone"
              variant="outlined"
              required
              id="phone"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="email"
              name="email"
              variant="outlined"
              required
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <Button type="submit" variant="contained" fullWidth sx={{backgroundColor: '#3d96ff'}}>
            Add Doctor
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

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
  text-transform: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.helper};
  }
`;

const Alert = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  border: 1px solid #f5c6cb;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 15px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #474747;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${Input} {
    width: calc(50% - 5px);  // Adjust width of individual Input components
  }
`;


export default AddDoctor;
