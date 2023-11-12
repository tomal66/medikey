import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from '../context/auth_context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddTest = () => {
  const [testType, setTestType] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [testReport, setTestReport] = useState(null);
  const [testFile, setTestFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useAuthContext();
  const nav = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTestReport(file.name);
      setTestFile(file);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      
      const patientResponse = await axios.get(`http://localhost:8567/api/patients/phone/${patientPhone}`);
      const patientDto = patientResponse.data;
  

      const testDto = {
        patientId: patientDto.patientId,
        dateRecorded: new Date(),
        testLocationId: currentUser.hospitalId, 
        testType: testType,
        doctorName: doctorName,
        testReport: testReport
      };
  
      const testResponse = await axios.post('http://localhost:8567/api/test/create', testDto);
      const createdTest = testResponse.data;
      if (testFile && createdTest.testId) {
        const formData = new FormData();
        formData.append('file', testFile);
  
        // Send POST request to upload the file
        await axios.post(`http://localhost:8567/api/storage/upload/reports/${createdTest.testId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('Test created:', createdTest);
      setLoading(false);

      Swal.fire({
        title: 'Success',
        text: 'Report Uploaded!',
        icon: 'success',
        confirmButtonColor: '#3D96FF',
        confirmButtonText: 'Done',
        heightAuto: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/mp-dashboard'); // Navigate to the dashboard
        }
      });
    } catch (error) {
      console.error('Error creating test:', error);
      setLoading(false);
      Swal.fire({
        title: 'Error',
        text: 'Wrong phone!',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3D96FF',
        heightAuto: true,
      });

    }
  };
  

  return (
    <Wrapper>
      <Container>
        <Title>Add Test</Title>

        <Form onSubmit={handleSubmit}>

        <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField
              type="tel"
              name="patientPhone"
              variant="outlined"
              required
              id="phone"
              label="Patient Phone"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField
              name="testType"
              variant="outlined"
              required
              id="testType"
              label="Test Type"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField
              name="doctorName"
              variant="outlined"
              required
              id="doctorName"
              label="Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '100%' }}>
            <Input
              accept="image/*,application/pdf"
              id="test-report"
              type="file"
              onChange={handleFileChange}
            />
          </FormControl>

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
            sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '100%' }}
          >
            Add Test
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

export default AddTest;
