import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from '../context/auth_context';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const New = styled.div`
  width: 100%;
  display: flex;
`;



const NewContainer = styled.div`
  flex: 6;

  .top, .bottom {
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 10px;
    margin: 20px;
    display: flex;
  }

  h1 {
    color: gray;
    font-size: 20px;
  }
`;

const Left = styled.div`
  flex: 1;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 15px;
  margin: 16px;

  .patient-card-header {
    text-align: center;  // Center align header
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .icon {
    cursor: pointer;
    font-size: 25px;
    margin-right: 10px;
    transition: color 0.2s ease-in-out;
  }
  .my-icon {
    color: grey;
  }

  .my-icon:hover {
    color: #3D96FF;
  }

  .my-icon .tooltip {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
  }
  .my-icon:hover .tooltip {
    display: block;
  }

`;

const PatientDetail = styled.div`
  margin-bottom: 10px;
  font-size: 17px;

  strong {
    margin-right: 10px;
  }
`;


const Right = styled.div`
  flex: 2;

  form {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-around;
    margin-top: 30px;

    button {
      width: 150px;
      padding: 10px;
      border: none;
      background-color: ${({ theme }) => theme.colors.border};
      color: white;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
    }
  }
`;

const ITEM_HEIGHT = 48;



const HistoryForm = ({ inputs, title, visitData }) => {
  
  const [patientName, setPatientName] = useState(visitData.patientName);
  const [reasonToVisit, setReasonToVisit] = useState(visitData.reason);
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [allergies, setAllergies] = useState("");
  const [chronicDiseases, setChronicDiseases] = useState("");
  const [immunization, setImmunization] = useState("");
  const [previousSurgeries, setPreviousSurgeries] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [doctor, setDoctor] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser} = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:8567/api/doctors/id/${visitData.doctorId}`);
        const doctorData = response.data;
        setDoctor(`Dr. ${doctorData.firstName} ${doctorData.lastName}`);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        // Handle error appropriately
      }
    };

    if (visitData && visitData.doctorId) {
      fetchDoctor();
    }
  }, [visitData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
  
    // Creating an object with all the form data
    const formData = {
      patientId: visitData.patientId, 
      visitId: visitData.visitId,
      diagnosis,
      symptoms,
      allergies,
      chronicDiseases,
      recordedByMPId: currentUser.mpId,
      immunizations: immunization, 
      previousSurgeries,
      familyHistory,
      height,
      weight,
      notes: note
      
    };
    console.log(formData);
    try {
      // Sending a POST request to the API endpoint
      const response = await axios.post('http://localhost:8567/api/medicalHistories', formData);
      console.log('Response:', response.data);
      setLoading(false);
      Swal.fire({
        title: 'Success',
        text: 'History saved!',
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
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error saving history!',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#3d96ff',
      })
      setLoading(false);
    }
    
  };
  

  return (
    <New>
      <NewContainer>
        <div className="top">
          <h1>Patient History</h1>
        </div>
        <div className="bottom">
          <Left>
            <Card>
              <h3 className='patient-card-header'>Patient Details</h3>
              <PatientDetail><strong>Name:</strong> {patientName}</PatientDetail>
              <PatientDetail><strong>Reason to visit:</strong> {reasonToVisit}</PatientDetail>
              <PatientDetail><strong>Doctor:</strong> {doctor}</PatientDetail>
            </Card>
          </Left>
          <Right>
          
          <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Height"
                  variant="outlined"
                  placeholder="Height in cm or inches"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Weight"
                  variant="outlined"
                  placeholder="Weight in kg or lbs"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Symptoms"
                  variant="outlined"
                  placeholder="Describe symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Allergies"
                  variant="outlined"
                  placeholder="List any allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Chronic Diseases"
                  variant="outlined"
                  placeholder="Any chronic diseases"
                  value={chronicDiseases}
                  onChange={(e) => setChronicDiseases(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Immunization History"
                  variant="outlined"
                  placeholder="Immunization details"
                  value={immunization}
                  onChange={(e) => setImmunization(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Previous Surgeries"
                  variant="outlined"
                  placeholder="Details of any surgeries"
                  value={previousSurgeries}
                  onChange={(e) => setPreviousSurgeries(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  label="Family Medical History"
                  variant="outlined"
                  placeholder="Family medical history"
                  value={familyHistory}
                  onChange={(e) => setFamilyHistory(e.target.value)}
                  inputProps={{ style: { textTransform: 'none' } }}
                />
              </FormControl>
              
              <div style={{ width: '100%', textAlign: 'center', paddingLeft: '30px' }}>
               <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={loading}
                sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '100%', mt: 2 }}
                >
                Save
                </LoadingButton>

              </div>
            </form>
          </Right>
          
        
        </div>
      </NewContainer>
    </New>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
  height: 48vh; // adjusts the height to be 80% of the viewport height
  overflow-y: auto; // enables scrolling on the y-axis

  h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
    text-align: left; /* Added to align the order info to the left */
  }
  p strong {
    font-weight: bold;
  }
`;


const TableModalContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 15%;
  

  background-color: white;
  padding: 20px;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 70%;
  max-width: 70%;
  height: 50vh;
  overflow-y: auto;
  overflow-x: auto;

  h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
    text-align: left; /* Added to align the order info to the left */
  }
  p strong {
    font-weight: bold;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 0px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
  text-transform: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.border};
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


export default HistoryForm;
