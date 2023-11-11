import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAuthContext } from '../context/auth_context';

const AddMP = () => {
  //const { login, isAuthenticated, error, role } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const {currentUser} = useAuthContext();
  const API = 'http://localhost:8567/api/'

  const doPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username && password && password.length >= 8 && doPasswordsMatch()) {
        try{

          console.log(username+password);

          const userResponse = await axios.post(API + 'auth/register', {
            username: username,
            password: password,
            role: 'ROLE_STAFF',
          });
    
          const userId = userResponse.data;
    
          const mpDto = {
            userId: userId, // Assuming the backend expects the userId separately
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email,
            phone: phone,
            hospitalId: currentUser.hospitalId,
          };
    
          await axios.post(API + 'medicalProfessionals', mpDto);
  
          // Prepare the email data
          const emailData = {
            to: email,
            from: "medikey.health@gmail.com",
            subject: "Account Created",
            name: `${firstName} ${lastName}`, // Consider including the last name as well
            role: 'Medical Professional',
            username: username,
            password: password,
          };
    
          // Send the email
          await axios.post(API + 'mail/sendingEmail', emailData);
          
          // Success alert
          setLoading(false);
            Swal.fire({
                title: 'Success',
                text: 'Staff Added and Email sent!',
                icon: 'success',
                confirmButtonColor: '#3D96FF',
                confirmButtonText: 'Done',
                heightAuto: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  nav('/hospital-dashboard'); // Replace '/' with the desired path
                }
              });
          } catch(error){
            Swal.fire({
                title: 'Error',
                text: 'Failed to add staff',
                icon: 'error',
                confirmButtonText: 'Try Again',
                heightAuto: true,
              });
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
    setMessage('');
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Register Staff</Title>
        {message && <Alert>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="username"
              id="username"
              name="username"
              label="Staff Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
              required
              fullWidth
            />
          </FormControl>

          <StyledRow>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
          </StyledRow>

          <StyledRow>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="text"
                id="firstName"
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="text"
                id="lastName"
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
          </StyledRow>

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="tel"
              id="phone"
              name="phone"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              fullWidth
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="email"
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
            sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '350px' }}
          >
            Add Staff
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
  margin-bottom: 50px;
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

export default AddMP;
