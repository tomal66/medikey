import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, isAuthenticated, error, role, currentUser } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
    //login(username, password)
    // .then(() => {
    //   console.log('Logged in successfully');
    // })
    // .catch((error) => {
    //   setMessage('Invalid credentials. Please try again.');
    //   console.log('Error:', error);
    // });
  }; 

  useEffect(() => {
    if (isAuthenticated) {
      if (!currentUser && role!="ROLE_ADMIN") {
        // Redirect to the respective form page based on the role if currentUser is not found
        switch (role) {
          case "ROLE_PATIENT":
            
            nav("/patient-form");
            break;
          case "ROLE_DOCTOR":
            nav("/doctor-form");
            break;
          case "ROLE_STAFF":
            nav("/staff-form");
            break;
          case "ROLE_HOSPITAL":
            nav("/hospital-form");
            break;
          // case "ROLE_ADMIN":
          //   nav("/admin-form");
          //   break;
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
          <Input
            type="username"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>
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

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 7.5px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.btn};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover,
  &:active {
    box-shadow: 0 20px 20px 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }

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
