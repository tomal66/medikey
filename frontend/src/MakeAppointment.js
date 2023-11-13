import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';
import { Modal, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DoctorCard from './component/DoctorCard';
import dayjs from 'dayjs';
import LoadingButton from '@mui/lab/LoadingButton';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useAuthContext } from './context/auth_context';
import Swal from 'sweetalert2';

const MakeAppointment = () => {
  // Sample data, replace with actual data from your API
  const [doctors, setDoctors] = useState([]);  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const department = params.get('department');
  const [isDoctorAvailable, setIsDoctorAvailable] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const { currentUser } = useAuthContext();
  const [search, setSearch] = useState(""); // Add this line
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (department) {
      setSearch(department);
    }
  }, [department]);

  useEffect(() => {
    console.log('Fetching doctors...'); // This should log when the component mounts
  
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8567/api/doctors/all');
        setDoctors(response.data);
        console.log('Doctors fetched', response.data); // Check the fetched data
      } catch (error) {
        setDoctors([]);
        console.error('Failed to fetch doctors:', error);
      }
    };
  
    fetchDoctors();
  }, []);
    
  const handleMUIDateChange = async (newValue) => {
    //setSelectedDate(newValue.toDate().toISOString().split('T')[0]); // Convert dayjs object to JavaScript Date
    const selectedDayName = newValue.format('dddd'); // Get the full name of the day of the week
    const availableDays = selectedDoctor?.daysOfWeek.split(',').map(day => day.trim());
    
    if (!availableDays.includes(selectedDayName)) {
      setAvailabilityMessage(`Doctor is not available on ${selectedDayName}`);
      setIsDoctorAvailable(false);
      return;
    }
  
    // If the doctor is available on the selected day of the week, proceed to check with the API
    checkDoctorAvailabilityViaAPI(selectedDoctor.doctorId, newValue);
  };
  
  const checkDoctorAvailabilityViaAPI = async (doctorId, date) => {
    setIsCheckingAvailability(true);
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate)
    try {
      const response = await axios.get(`http://localhost:8567/api/visits/doctor/${doctorId}/availability`, {
        params: { date: formattedDate },
      });
  
      const isAvailable = response.data === "Doctor is available on the selected date.";
      setIsDoctorAvailable(isAvailable);
      setAvailabilityMessage(response.data);
    } catch (error) {
      console.error('Error checking doctor availability:', error);
      setAvailabilityMessage("Error checking doctor availability.");
      setIsDoctorAvailable(false);
    }
  
    setIsCheckingAvailability(false);
  };
  
  

  
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
    setAvailabilityMessage("")
  };

  const handleCloseModal = () => {
    // Reset all states to their initial values
    setSelectedDoctor(null);
    setSelectedDate(null);
    setReason('');
    setAvailabilityMessage('');
    setIsDoctorAvailable(false);
    setIsCheckingAvailability(false);
    setModalOpen(false);
  };

  const handleMakeAppointment = async () => {
    setIsCheckingAvailability(true);
    if (!selectedDoctor || !currentUser || !selectedDate || !reason) {
      console.error('Missing information to make an appointment.');
      return;
    }
  
    // Create the VisitDto object
    const visitDto = {
      doctorId: selectedDoctor.doctorId,
      patientId: currentUser.patientId,
      patientName: `${currentUser.firstName.trim()} ${currentUser.lastName.trim()}`,
      reason: reason,
      visitDate: selectedDate, // Assuming the date is stored in the right format
      // Include any other fields that your VisitDto expects
    };
    console.log(visitDto)
    try {
      
      const response = await axios.post('http://localhost:8567/api/visits', visitDto);
      const savedVisitDto = response.data;
  
      // If the POST request was successful, close the modal and reset states
      handleCloseModal();
  
      // Optionally, display a success message
      console.log('Appointment made successfully:', savedVisitDto);
      setIsCheckingAvailability(false);
      Swal.fire({
        title: 'Appointment Made Successfully!',
        text: 'Please check email for details',
        icon: 'success',
        confirmButtonColor: '#3D96FF',
        confirmButtonText: 'Okay',
        heightAuto: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/patient-dashboard'); // Navigate to the dashboard
        }
      });

    } catch (error) {
      // Handle errors, such as displaying a message to the user
      console.error('Failed to make an appointment:', error);
      setIsCheckingAvailability(false);
      Swal.fire({
        title: 'Error',
        text: 'Failed to make appointment',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3D96FF',
        heightAuto: true,
      });
    }
  };
  
  

  
  const filteredDoctors = doctors.filter(
    doctor =>
    doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(search.toLowerCase()) || 
    doctor.department.toLowerCase().includes(search.toLowerCase())
);


  return (
    <Wrapper>
        <div className='container'>
        <TextField
          type="text"
          label="Search Doctors"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{
            marginBottom: '10px',           
          }}
          inputProps={{ 
          style: { textTransform: 'none' } }}
        />
        
        
          <DoctorList>
            <div className="grid grid-three-column">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.doctorId} doctor={doctor} handleOpenModal={handleOpenModal} />
              ))}
  
            </div>
          </DoctorList>
            <Modal open={isModalOpen} onClose={handleCloseModal} disableScrollLock={true}>
            <ModalContainer>
            <h3>{`Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}</h3>
            {availabilityMessage && (
              <Alert color={isDoctorAvailable ? "green" : "red"}>
                {availabilityMessage}
              </Alert>
            )}       

            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <DatePicker
                  value={null}
                  onChange={handleMUIDateChange}
                  label="Select a date"
                  renderInput={(params) => <TextField {...params} />}
                  minDate={dayjs()}
                  maxDate={dayjs().add(6, 'day')}
                />
              </FormControl>
              
              {isDoctorAvailable && (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <TimePicker
                    label="Starting Time"
                    value={dayjs(selectedDoctor?.startTime, 'HH:mm:ss')}
                    readOnly
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              )}


              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  id="reason"
                  name="reason"
                  label="Reason for visit"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  variant="outlined"
                  inputProps={{ style: { textTransform: 'none' } }}
                  margin="normal"
                />
              </FormControl>
              
            </LocalizationProvider>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isCheckingAvailability}
              disabled={!isDoctorAvailable || isCheckingAvailability}
              sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '100%', marginTop: '5px' }}
              onClick={handleMakeAppointment}
            >
              Make Appointment
            </LoadingButton>

            </ModalContainer>
        </Modal>
        </div>
        
    </Wrapper>
    
  );
};

const Wrapper = styled.div`
  min-height: 80vh;
  padding-top: 25px;
  background-color: ${({ theme }) => theme.colors.bg};
  padding-bottom: 25px;
  
  .grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Alert = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  border: 1px solid;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 15px;
  background-color: ${({ color }) => (color === "green" ? "#d4edda" : "#f8d7da")};
  color: ${({ color }) => (color === "green" ? "#155724" : "#721c24")};
  border-color: ${({ color }) => (color === "green" ? "#c3e6cb" : "#f5c6cb")};
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
  max-width: 350px;
  height: auto; // adjusts the height to be 80% of the viewport height: ;
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

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  outline: none;
  text-transform: none;
`;


const DoctorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;




export default MakeAppointment;
