import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
  //const { login, isAuthenticated, error, role } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const { login, isAuthenticated, error, role } = useAuthContext();


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
      if(role==="ROLE_SELLER")
      {
        nav("/seller-dashboard");
      }
      else if(role==="ROLE_ADMIN"){
        nav("/admin-dashboard");
      }
      else{
        nav("/");
      }

    }
  }, [isAuthenticated, nav]);

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
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  border: 1px solid #f5c6cb;
  border-radius: 3px;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 4rem;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 10rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #474747;
  text-align: center;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 1rem;
  outline: none;
  text-transform: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.helper};
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
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
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }

`;

const Options = styled.div`
margin-top: 3rem;
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
