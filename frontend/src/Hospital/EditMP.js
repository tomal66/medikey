import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAuthContext } from '../context/auth_context';
import { useParams } from 'react-router-dom';

const EditMP = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState({});
  const nav = useNavigate();
  const { id } = useParams(); 
  const API = 'http://localhost:8567/api/';

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API}medicalProfessionals/${id}`);
        const data = response.data;
        setStaff(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhone(data.phone);
        setEmail(data.email);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setMessage('Failed to load staff data');
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [id]); // Dependency array includes id to refetch if id changes



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        ...staff,
        firstName,
        lastName,
        phone,
        email,
      };

      await axios.put(`${API}medicalProfessionals/${id}`, updatedData);
      Swal.fire({
        title: 'Success',
        text: 'Staff Updated!',
        icon: 'success',
        confirmButtonColor: '#3D96FF',
        confirmButtonText: 'Done',
        heightAuto: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/hospital-dashboard'); // Navigate to the dashboard
        }
      });
    } catch (error) {
      console.error('Error updating staff data:', error);
      setMessage('Failed to update staff data');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setMessage('');
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Edit Staff</Title>
        {message && <Alert>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          

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

export default EditMP;
