import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import axios from 'axios';

const AddHospital = () => {
  //const { login, isAuthenticated, error, role } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ROLE_HOSPITAL');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const error = null;
  const API = 'http://localhost:8567/api/'

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
                role: role
            });

            const userId = userResponse.data;

            // Register the hospital with the received userId
            await axios.post(API+'hospitals', {
                userId: userId,
                name: name,
                address: address,
                city: city,
                state: state,
                country: country,
                postalCode: postalCode,
                phoneNumber: phoneNumber,
                email: email
            });

            // Prepare the email data
            const emailData = {
              to: email,
              from: "medikey.health@gmail.com",
              subject: "Account Created",
              name: `${name}`,
              role: 'Hospital',
              username: username,
              password: password 
          };

          // Send the email
          await axios.post(API+'mail/sendingEmail', emailData);

            Swal.fire({
                title: 'Success',
                text: 'Hospital Added!',
                icon: 'success',
                confirmButtonColor: '#3D96FF',
                confirmButtonText: 'Done',
                heightAuto: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    nav('/admin-dashboard'); // Replace '/' with the desired path
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to add hospital',
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
        <Title>Register Hospital</Title>
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
              fullWidth
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Hospital Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

            <StyledRow>
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Password"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  autoComplete="password"
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  type='password'
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
            </StyledRow>
            
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <StyledRow>
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
            

            
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              </StyledRow>

            <StyledRow>
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
            
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              </StyledRow>
              <FormControl sx={{ m: 1, width: 350 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
            

            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>

            <Button type="submit" variant='contained' fullWidth sx={{backgroundColor:'#3D96FF'}}>Add Hospital</Button>
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


export default AddHospital;
