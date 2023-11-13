import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom';

const EditHospital = () => {
  const [hospitalData, setHospitalData] = useState({});
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();
  const error = null;
  const API = 'http://localhost:8567/api/hospitals/'

  useEffect(() => {
    const fetchHospitalData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}${id}`);
        const data = response.data;
        setHospitalData(data);
        setName(data.name);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setCountry(data.country);
        setPostalCode(data.postalCode);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        setLoading(false);
      }
    };
  
    fetchHospitalData();
  }, [id]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const updatedHospitalData = {
      ...hospitalData,
      name,
      address,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      email
      
    };
  
    try {
      await axios.put(`${API}${id}`, updatedHospitalData);
      Swal.fire({
        title: 'Success',
        text: 'Hospital Updated Successfully!',
        icon: 'success',
        confirmButtonColor: '#3D96FF',
        confirmButtonText: 'Done',
        heightAuto: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/admin-dashboard'); // Replace '/some-path' with the path you want to redirect to after successful update
        }
      });
    } catch (error) {
      console.error('Error updating hospital data:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update hospital',
        icon: 'error',
        confirmButtonText: 'Try Again',
        heightAuto: true,
      });
    } finally {
      setLoading(false);
    }
    
  };
  



  useEffect(() => {
    if(error){
      setMessage("API Error")
    }
  }, [error, setMessage])

  useEffect(() => {
    setMessage('');
  }, []);

  return (
    <Wrapper>
      <Container>
      
        <Title>Edit Hospital</Title>
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
  /* background-color: ${({ theme }) => theme.colors.bg}; */
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


export default EditHospital;
