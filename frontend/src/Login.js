import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TextField, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { login, isAuthenticated, error, role, currentUser } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      // Additional logic after successful login
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
      console.error('Error:', error);
    }
    setLoading(false);
  }; 

  useEffect(() => {
    if (isAuthenticated) {
      if (!currentUser && role!="ROLE_ADMIN") {
        // Redirect to the respective form page based on the role if currentUser is not found
        switch (role) {
          case "ROLE_PATIENT":
            
            nav("/patient-form");
            break;
          default:
            nav("/default-form"); // A fallback form if needed
            break;
        }
      } else if (role === "ROLE_PATIENT") {
        
        nav("/patient-dashboard");
      } else if (role === "ROLE_DOCTOR") {
        nav("/doctor-dashboard");
      } else if (role === "ROLE_STAFF") {
        nav("/mp-dashboard");
      } else if (role === "ROLE_HOSPITAL") {
        nav("/hospital-dashboard");
      } else if (role === "ROLE_ADMIN") {
        nav("/admin-dashboard");
      } else {
        nav("/");
      }
    }
  }, [isAuthenticated, currentUser, role, nav]);


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
        <Title>Sign In</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }
        <Form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField
              type="text"
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>
          
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
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
            Sign In
          </LoadingButton>
        </Form>
        <Options>
          <Option href="#">Forgot Password?</Option>
          <NavLink to="/register">
            <Option >Register</Option>
          </NavLink>
        </Options>
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
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 100px;
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


const Options = styled.div`
margin-top: 30px;
  display: flex;
  justify-content: space-between;
  
`;

const Option = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.helper};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
