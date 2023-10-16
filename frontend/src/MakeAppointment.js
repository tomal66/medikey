import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';
import { Modal, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

  

const MakeAppointment = () => {
  // Sample data, replace with actual data from your API
  const [doctors, setDoctors] = useState([
    {
      doctorId: 1,
      firstName: 'John',
      lastName: 'Doe',
      department: 'Cardiology',
      hospital: 101,
    },
    {
      doctorId: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      department: 'Neurology',
      hospital: 102,
    },
    {
      doctorId: 3,
      firstName: 'Emily',
      lastName: 'Brown',
      department: 'Orthopedics',
      hospital: 103,
    },
    {
      doctorId: 4,
      firstName: 'William',
      lastName: 'Johnson',
      department: 'Radiology',
      hospital: 104,
    },
    {
      doctorId: 5,
      firstName: 'Sophia',
      lastName: 'Williams',
      department: 'Dermatology',
      hospital: 105,
    },
    {
      doctorId: 6,
      firstName: 'Michael',
      lastName: 'Davis',
      department: 'Gastroenterology',
      hospital: 106,
    },
  ]);  

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const department = params.get('department');
  useEffect(() => {
    if (department) {
      setSearch(department);
    }
  }, [department]);
  

  const [search, setSearch] = useState(""); // Add this line
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  
  const handleMUIDateChange = (newValue) => {
    setSelectedDate(newValue.toDate().toISOString().split('T')[0]); // convert dayjs object to JavaScript Date
    const dayOfWeek = newValue.day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setAvailabilityMessage('Doctor is not available on this date');
    } else {
      setAvailabilityMessage('');
    }
  };

  
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
    setAvailabilityMessage("")
  };

  const handleCloseModal = () => {
    console.log(selectedDate);
    setModalOpen(false);
    setReason('');
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
        <SearchInput
          type="text"
          placeholder="Search Doctors"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
        
          <DoctorList>
            <div className="grid grid-three-column">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.doctorId}>
                  <div className="doctor-header">
                    <h4 className="doctor-name">{`${"Dr."} ${doctor.firstName} ${doctor.lastName}`}</h4>
                    <img src="/images/doctor.jpg" alt={`${doctor.firstName} ${doctor.lastName}`} className="doctor-image" />
                  </div>
                  <p className="body">{doctor.department}</p>
                  <p className="body">{doctor.hospital}</p>
                  <Button onClick={() => handleOpenModal(doctor)}>Check Availability</Button>
                </DoctorCard>
              ))}
  
            </div>
          </DoctorList>
            <Modal open={isModalOpen} onClose={handleCloseModal} disableScrollLock={true}>
            <ModalContainer>
            <h3>{`${"Dr."} ${selectedDoctor.firstName} ${selectedDoctor.lastName}`}</h3>
            {availabilityMessage && (
            <Alert>
                {availabilityMessage}
            </Alert>
            )}
            {/* <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            customInput={<CustomInput />}
            />
            <Input
                  type="reason"
                  id="reason"
                  name="reason"
                  placeholder="Reason for visit"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                /> */}

            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <DatePicker
                  value={null}
                  onChange={handleMUIDateChange}
                  label="Select a date"
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  id="reason"
                  name="reason"
                  label="Reason for visit"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  variant="outlined"
                  
                  margin="normal"
                />
              </FormControl>
              
            </LocalizationProvider>
            <Button onClick={handleCloseModal} >Make Appointment</Button>
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
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  border: 1px solid #f5c6cb;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 15px;
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


const Button = styled.button`
  display: block;
  width: 100%;
  padding: 7.5px;
  margin-top: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  background-color: #3d96ff !important;
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

const DoctorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const DoctorCard = styled.div`
  width: 300px;
  background-color: #fafafa;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .doctor-header {
    display: flex;
    justify-content: flex-start; // Align items to the start
    align-items: center;
    margin-bottom: 10px;
  }

  .doctor-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: auto; // Push the image to the right
  }

  .doctor-name {
    font-weight: bold;
    font-size: 15px;
    color: #333;
  }

  .body {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
  }
`;


export default MakeAppointment;
