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
import HistoryTable from './HistoryTable';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
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
    margin-top: 30px;

    .add-button {
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



const ConsultationForm = ({ inputs, title, visitData }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedTests, setSelectedTests] = useState([]); // State for selected tests
  const [medications, setMedications] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTableOpen, setTableOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [followUpDate, setFollowUpDate] = useState(dayjs().add(7, 'day'));
  const [loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState(visitData.patientName);
  const [reasonToVisit, setReasonToVisit] = useState(visitData.reason);
  const [age, setAge] = useState("");
  const [note, setNote] = useState("");
  const nav = useNavigate();

  const [medicalHistory, setMedicalHistory] = useState({
    symptoms: '',
    allergies: '',
    chronicDiseases: '',
    familyHistory: '',
    immunizations: '',
    previousSurgeries: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8567/api/medicalHistories/id/${visitData.medicalHistoryId}`);
        setMedicalHistory(response.data);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchMedicalHistory();
  }, [visitData.medicalHistoryId]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8567/api/patients/age/${visitData.patientId}`);
        setAge(response.data);
      } catch (error) {
        console.error('Error fetching age:', error);
      }
    };

    fetchMedicalHistory();
  }, [visitData.patientId]);


  const handleModal = () => {
    setModalOpen(true);
  };

  const mapMedicationsToDto = () => {
    return medications.map(medication => {
      return {
        patientId: visitData.patientId,
        prescribedById: visitData.doctorId,
        visitId: visitData.visitId,
        datePrescribed: visitData.visitDate,
        medicationName: medication.medicationName,
        dosage: medication.dosage,
        frequency: medication.frequency,
        duration: medication.duration,
        status: 'Active',
      };
    });
  };

  function createTimeString(timeString) {
    // Get the current date
    let now = new Date();

    // Extract hours, minutes, and seconds from the time string
    let parts = timeString.split(':');
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);
    let seconds = parseFloat(parts[2]);

    // Set hours, minutes, and seconds to the current date
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    now.setMilliseconds(seconds % 1 * 1000); // Convert fractional seconds to milliseconds

    // Return the ISO string
    return now.toISOString();
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const medicationDtos = mapMedicationsToDto();

      // Update medicalHistory object
      const updatedMedicalHistoryDto = {
        ...medicalHistory,
        diagnosis: diagnosis,
        notes: note
      };

      // Update visitData object
      const updatedVisitDto = {
        ...visitData,
        tests: selectedTests.join(', '), // Assuming tests are stored as an array
        arrivalTime: createTimeString(visitData.arrivalTime),
        checkingTime: new Date().toISOString(),
        followUpDate: followUpDate.format('YYYY-MM-DD') // Format date as needed
      }
      //console.log(updatedVisitDto)

      // Update Medical History
      await axios.put(`http://localhost:8567/api/medicalHistories/${medicalHistory.medicalHistoryId}`, updatedMedicalHistoryDto);

      // Update Visit
      await axios.put(`http://localhost:8567/api/visits/${visitData.visitId}`, updatedVisitDto);

      // Add Medications
      if (medicationDtos.length > 0) {
        await axios.post('http://localhost:8567/api/medications/batch', medicationDtos);
      }

      // Prepare MailRequest object
      const mailRequest = {
        subject: 'Your Prescription Details',
        prescriptionData: {
            // Add all necessary prescription data
            doctorId: updatedVisitDto.doctorId, // Assuming you have the doctor's ID
            patientId: updatedVisitDto.patientId, // Assuming you have the doctor's ID
            patientName: updatedVisitDto.patientName, // Assuming you have the patient's name
            date: updatedVisitDto.visitDate, // Current date in YYYY-MM-DD format
            reason: updatedVisitDto.reason, // Assuming diagnosis is the reason for the prescription
            symptoms: updatedMedicalHistoryDto.symptoms, // Assuming you have symptoms data
            diagnosis: updatedMedicalHistoryDto.diagnosis,
            followUpDate: followUpDate.format('YYYY-MM-DD'),
            note: note,
            tests: selectedTests.join(', '),
            medications: medicationDtos
        }
    };

    // Send Prescription Email
    await axios.post('http://localhost:8567/api/mail/sendPrescriptionEmail', mailRequest);


      Swal.fire({
          title: 'Success',
          text: 'Appointment Completed!',
          icon: 'success',
          confirmButtonColor: '#3D96FF',
          confirmButtonText: 'Done',
          heightAuto: true,
      }).then((result) => {
          if (result.isConfirmed) {
              nav('/doctor-dashboard'); // Navigate to doctor-dashboard on success
          }
      });

    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
          title: 'Error',
          text: 'Failed to save appointment',
          icon: 'error',
          confirmButtonText: 'Try Again',
          heightAuto: true,
      });
    } finally {
      setLoading(false);
    }

    
  }; 

  const handleMUIDateChange = async (newValue) => {
    const formattedDate = newValue.format('YYYY-MM-DD');
    setFollowUpDate(newValue)
  };

  const removeMedication = (medicationName) => {
    const newMedications = medications.filter(med => med.medicationName !== medicationName);
    setMedications(newMedications);
  };
  

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

  const handleIconClick = (content) => {
    setModalContent(content);
    setTableOpen(true);
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
              <PatientDetail><strong>Name:</strong> {patientName}</PatientDetail>
              <PatientDetail><strong>Reason to visit:</strong> {reasonToVisit}</PatientDetail>
              <PatientDetail><strong>Age:</strong> {age}</PatientDetail>
              <PatientDetail><strong>Height:</strong> {medicalHistory.height}</PatientDetail>
              <PatientDetail><strong>Weight:</strong> {medicalHistory.weight}</PatientDetail>
              <PatientDetail><strong>Symptoms:</strong> {medicalHistory.symptoms}</PatientDetail>
              <PatientDetail><strong>Allergies:</strong> {medicalHistory.allergies}</PatientDetail>
              <PatientDetail><strong>Chronic Diseases:</strong> {medicalHistory.chronicDiseases}</PatientDetail>
              <PatientDetail><strong>Immunization:</strong> {medicalHistory.immunizations}</PatientDetail>
              <PatientDetail><strong>Previous Surgeries:</strong> {medicalHistory.previousSurgeries}</PatientDetail>
              <PatientDetail><strong>Family History:</strong> {medicalHistory.familyHistory}</PatientDetail>
              <div style={{ textAlign: 'center', marginTop: '30px' }}>

              <FaHistory
                className="icon my-icon"
                onClick={() => handleIconClick('History')}
              />
              <BiTestTube
                className="icon my-icon"
                onClick={() => handleIconClick('Test')}
              />
              <BsCapsule
                className="icon my-icon"
                onClick={() => handleIconClick('Medication')}
              />

                
              </div>
            </Card>
          </Left>
          <Right>
          
            <form onSubmit={handleSubmit}>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField
                          label="Diagnosis"
                          variant="outlined" // You can choose other variants like "filled" if you prefer
                          placeholder="Diagnosis"
                          value={diagnosis}
                          onChange={(e) => setDiagnosis(e.target.value)}
                          required
                          inputProps={{ style: { textTransform: 'none' } }}
                        />  
                  </FormControl>            
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
                      inputProps={{MenuProps: {disableScrollLock: true}}}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={selectedTests.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <DatePicker
                        value={followUpDate}
                        onChange={handleMUIDateChange}
                        label="Follow-Up day"
                        renderInput={(params) => <TextField {...params} />}
                        minDate={dayjs()}
                        required
                      />
                    </FormControl>
                    </LocalizationProvider>
                  

                  <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField
                          label="Note"
                          variant="outlined" // You can choose other variants like "filled" if you prefer
                          placeholder="Note"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          
                          inputProps={{ style: { textTransform: 'none' } }}
                        />  
                  </FormControl> 


                {medications.map((medication) => (
                  <Medication 
                    medication={medication}
                    onDelete={removeMedication} />
                ))}

              <div style={{ width: '100%', textAlign: 'center', paddingLeft: '30px' }}>
                <Button className="add-button" type="button" onClick={handleModal}>+ Medication</Button>
                <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={loading}
                sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '150px', mt: 2 }}
              >
                Save
              </LoadingButton>

              </div>
            </form>
          </Right>
          {/* Medication Modal */}
          <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="review-modal-title"
            aria-describedby="review-modal-description"
            disableScrollLock={true}
        >
            <ModalContainer>
                <h3 id="review-modal-title">Add Medication</h3>
                <FormControl sx={{ m: 1, width: 250 }}>
                  <TextField
                    label="Medication Name"
                    variant="outlined"
                    placeholder="ie. Napa"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    required
                    inputProps={{ style: { textTransform: 'none' } }}
                    id="medicationName"
                    name="medicationName"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                  <TextField
                    label="Dosage"
                    variant="outlined"
                    placeholder="ie. 500mg"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    required
                    inputProps={{ style: { textTransform: 'none' } }}
                    id="dosage"
                    name="dosage"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                  <TextField
                    label="Frequency"
                    variant="outlined"
                    placeholder="ie. 1-1-1"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                    inputProps={{ style: { textTransform: 'none' } }}
                    id="frequency"
                    name="frequency"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                  <TextField
                    label="Duration"
                    variant="outlined"
                    placeholder="ie. 7 days"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    inputProps={{ style: { textTransform: 'none' } }}
                    id="duration"
                    name="duration"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: 250 }}>
                  <Button className="add-button" onClick={addMedication}>Add</Button>
                </FormControl>
                

            </ModalContainer>
        </Modal>

        {/* Tables Modal */}        
        
        <Modal
          open={isTableOpen}
          onClose={() => setTableOpen(false)}
          disableScrollLock={true}
        >
          <TableModalContainer>
            <h3>{modalContent}</h3>
            {modalContent === 'History' && <HistoryTable />}
            {/* {modalContent === 'Test' && <TestTable />}
            {modalContent === 'Medication' && <MedicationTable />} */}
          </TableModalContainer>
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


export default ConsultationForm;
