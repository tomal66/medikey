import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Modal } from "@mui/material";
import Medication from './Medication';
import {BsCapsule} from 'react-icons/bs';
import {FaHistory} from 'react-icons/fa';
import {BiTestTube} from 'react-icons/bi'
import Tooltip from '@mui/material/Tooltip';

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
  border-radius: 1.5rem;
  margin: 16px;

  .patient-card-header {
    text-align: center;  // Center align header
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .icon {
    cursor: pointer;
    font-size: 2.5rem;
    margin-right: 1rem;
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
  margin-bottom: 20px;
  font-size: 14px;

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

    .formInput {
      width: 40%;

      label {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: .5rem;
        font-size: small;

        .icon {
          cursor: pointer;
        }
      }

      input {
        display: block;
        width: 100%;
        padding: 1rem;
        font-size: 16px;
        border: 0px solid ${({ theme }) => theme.colors.border};
        border-radius: 3px;
        margin-bottom: 1rem;
        outline: none;
        text-transform: none;
        &:focus {
          border: 1px solid ${({ theme }) => theme.colors.border};
          
        }
      }
    }

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
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Complete Blood Count',
  'Blood Glucose Test',
  'Cholesterol Test',
  'Liver Function Test',
  'Thyroid Function Test',
  'Urinalysis',
  'Electrocardiogram',
  'Magnetic Resonance Imaging',
  'Computed Tomography Scan',
  'Colonoscopy'
];



const ConsultationForm = ({ inputs, title }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedTests, setSelectedTests] = useState([]); // State for selected tests
  const [medications, setMedications] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [patientName, setPatientName] = useState("");
  const [reasonToVisit, setReasonToVisit] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [allergies, setAllergies] = useState("");
  const [chronicDiseases, setChronicDiseases] = useState("");
  const [immunization, setImmunization] = useState("");
  const [previousSurgeries, setPreviousSurgeries] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");


  const handleModal = () => {
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    //login(username, password)
    // .then(() => {
    //   console.log('Logged in successfully');
    // })
    // .catch((error) => {
    //   setMessage('Invalid credentials. Please try again.');
    //   console.log('Error:', error);
    // });
  }; 

  const removeMedication = (medicationName) => {
    const newMedications = medications.filter(med => med.medicationName !== medicationName);
    setMedications(newMedications);
  };
  

  useEffect(() => {
    console.log(medications);
  }, [medications]);

  const addMedication = () => {
    const newMedication = {
      medicationName,
      dosage,
      frequency,
      duration
    };
  
    setMedications(prevMedications => [...prevMedications, newMedication]);
  
    // Clear the input fields
    setMedicationName('');
    setDosage('');
    setFrequency('');
    setDuration('');
  
    // Close the modal
    setModalOpen(false);
  };

  const handleHistory = () => {
    console.log("History");
  };
  const handleTest = () => {
    console.log("Test");
  };
  const handleMediation = () => {
    console.log("Medication");
  };

  const handleTestChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTests(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(selectedTests);
  };

  return (
    <New>
      <NewContainer>
        <div className="top">
          <h1>Patient Consultation</h1>
        </div>
        <div className="bottom">
          <Left>
            <Card>
              <h3 className='patient-card-header'>Patient Details</h3>
              <PatientDetail><strong>Patient name:</strong> {patientName}</PatientDetail>
              <PatientDetail><strong>Reason to visit:</strong> {reasonToVisit}</PatientDetail>
              <PatientDetail><strong>Symptoms:</strong> {symptoms}</PatientDetail>
              <PatientDetail><strong>Allergies:</strong> {allergies}</PatientDetail>
              <PatientDetail><strong>Chronic Diseases:</strong> {chronicDiseases}</PatientDetail>
              <PatientDetail><strong>Immunization:</strong> {immunization}</PatientDetail>
              <PatientDetail><strong>Previous Surgeries:</strong> {previousSurgeries}</PatientDetail>
              <PatientDetail><strong>Family History:</strong> {familyHistory}</PatientDetail>
              <div style={{ textAlign: 'center', marginTop: '30px' }}>

                <FaHistory
                    className="icon my-icon"
                    onClick={() => handleHistory()} // Assumes 'id' is the unique identifier for each row
                  />

                <BiTestTube
                  className="icon my-icon"
                  onClick={() => handleTest()} // Assumes 'id' is the unique identifier for each row
                />
                <BsCapsule
                  className="icon my-icon"
                  onClick={() => handleMediation()} // Assumes 'id' is the unique identifier for each row
                />
                
              </div>
            </Card>
          </Left>
          <Right>
            <form onSubmit={handleSubmit}>
              
                <div className="formInput">
                  <label>Diagnosis</label>
                  <input type='text' placeholder='Diagnosis' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}/>
                </div>

                <div className="formInput">
                  <label></label>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel>Tests</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={selectedTests}
                      onChange={handleTestChange}
                      input={<OutlinedInput label="Tests" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={selectedTests.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                </div>
                {medications.map((medication) => (
                  <Medication 
                    medication={medication}
                    onDelete={removeMedication} />
                ))}

              <div style={{ width: '100%', textAlign: 'center', paddingLeft: '3rem' }}>
                <Button onClick={handleModal}>+ Medication</Button>
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </Right>
          {/* Medication Modal */}
          <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="review-modal-title"
            aria-describedby="review-modal-description"
        >
            <ModalContainer>
                <h3 id="review-modal-title">Add Medication</h3>
                <Input
                  type="medicationName"
                  id="medicationName"
                  name="medicationName"
                  placeholder="Medication Name"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  required
                />
                <Input
                  type="dosage"
                  id="dosage"
                  name="dosage"
                  placeholder="Dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                />
                <Input
                  type="frequency"
                  id="frequency"
                  name="frequency"
                  placeholder="Frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  required
                />
                <Input
                  type="duration"
                  id="duration"
                  name="duration"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />

                <Button onClick={addMedication}>Add</Button>

            </ModalContainer>
        </Modal>
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
  padding: 2rem;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  height: 35vh; // adjusts the height to be 80% of the viewport height
  overflow-y: auto; // enables scrolling on the y-axis

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    text-align: left; /* Added to align the order info to the left */
  }
  p strong {
    font-weight: bold;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 16px;
  border: 0px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 1rem;
  outline: none;
  text-transform: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.border};
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


export default ConsultationForm;
