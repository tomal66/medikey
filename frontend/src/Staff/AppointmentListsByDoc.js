import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Button } from '@mui/material';
import Html5QrcodePlugin from '../Html5QrcodePlugin';
import Loading from '../style/Loading'
import { useAuthContext } from '../context/auth_context';
import format from 'date-fns/format';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';



const AppointmentListsByDoc = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {currentUser} = useAuthContext();
  const [appoitnments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);


  useEffect(() => {
    // Fetch doctors when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`http://localhost:8567/api/doctors/hospital/${currentUser.hospitalId}`);
        setDoctors(response.data);
        console.log(doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Handle error appropriately
      }
    };

    fetchDoctors();
  }, [currentUser]);
      
  const handleViewPatient = async (patientId) => {
    setPatientModalOpen(true); // Open the modal immediately
    setPatientDetails(null);   // Reset patient details (optional)

    try {
        const response = await axios.get(`http://localhost:8567/api/patients/patient/${patientId}`);
        setPatientDetails(response.data);
    } catch (error) {
        console.error('Error fetching patient details:', error);
        // Handle error appropriately
    }
};


    useEffect(() => {
      const fetchAppointments = async () => {
        setIsLoading(true); // Start loading before the API call
        const formattedDate = format(new Date(), 'yyyy-MM-dd'); // format today's date
        try {
          const response = await axios.get(`http://localhost:8567/api/visits/doctor/${selectedDoctor.doctorId}?visitDate=${formattedDate}`);
          const mappedAppointments = response.data.map((appt) => ({
            id: appt.slNo.toString(), // Convert to string because DataGrid expects IDs as strings
            name: appt.patientName,
            arrivedAt: appt.arrivalTime || 'Not yet', // Replace null with 'Not yet'
            reason: appt.reason,
            code: appt.uniqueIdentifier,
            visitId: appt.visitId,
            isCompleted: !!appt.checkingTime,
            isHistoryTaken: !!appt.medicalHistoryId,
            patientId: appt.patientId,
            
          }));
          setAppointments(mappedAppointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
          // Handle error, maybe set an error message in state and display it
        }
        setIsLoading(false); // Stop loading regardless of the outcome
      };
    
      fetchAppointments();
    }, [selectedDoctor]);
    
      
    const [search, setSearch] = useState(""); // Add this line

    const filteredAppointments = appoitnments.filter(
        appointment =>
        appointment.id.toLowerCase().includes(search.toLowerCase()) ||
        appointment.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', flex: .3, headerAlign: 'left' },
        { field: 'name', headerName: 'Patient Name', flex: 1, headerAlign: 'left' },
        { field: 'arrivedAt', headerName: 'Arrived at', type: 'time', flex: 1, headerAlign: 'left' },
        { field: 'reason', headerName: 'Reason', flex: 1, headerAlign: 'left' },
        {
            field: 'history',
            headerName: 'History',
            flex: .5,
            headerAlign: 'left',
            renderCell: (params) => (
                params.row.isHistoryTaken 
                    ? <CheckCircleIcon style={{ color: '#07CA1F' }} />
                    : <BlockIcon style={{ color: 'red' }} />
            ),
        },
        {
            field: 'completed',
            headerName: 'Completed',
            flex: .5,
            headerAlign: 'left',
            renderCell: (params) => (
                params.row.isCompleted 
                    ? <CheckCircleIcon style={{ color: '#07CA1F' }} />
                    : <BlockIcon style={{ color: 'red' }} />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: .3,
            sortable: false,
            renderCell: (params) => (
                <AiFillEye
                    className="icon edit-icon"
                    onClick={() => handleViewPatient(params.row.patientId)}
                />
            ),
        },
    ];
    
  
    return (
      <Wrapper>
        <div className="container"> 
        <Autocomplete
        disablePortal
        id="doctor-autocomplete"
        options={doctors}
        getOptionLabel={(option) => `Dr. ${option.firstName} ${option.lastName}`}
        sx={{ width: 350, backgroundColor:'#FFF', marginBottom: '10px' }} // Adjust width and margin as needed
        renderInput={(params) => (
            <TextField 
            {...params} 
            label="Doctor Name" 
            required 
            inputProps={{ ...params.inputProps, style: { textTransform: 'none' } }} 
            />
        )}
        onChange={(event, newValue) => {
            setSelectedDoctor(newValue);
        }}
        />


        <TextField
          type="text"
          label="Search Patients"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{
            marginBottom: '10px',   
            backgroundColor: '#FFF'        
          }}
          inputProps={{ 
          style: { textTransform: 'none' } }}
        />
        <div style={{ height: 400, width: '100%',}}>
            <DataGrid                
                sx={{
                    
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 2,
                    border: 0,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}

                rows={filteredAppointments}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                
                classes={'datagrid'}
            />
            </div>
        
        </div>

        <Modal
            open={isPatientModalOpen}
            onClose={() => setPatientModalOpen(false)}
            disableScrollLock
        >
            <ModalContainer>
                <h3>Patient Details</h3>
                {!patientDetails ? (
                    <Loading /> // Show loading component while data is being fetched
                ) : (
                    <div>
                        <p><strong>Name:</strong> {patientDetails.firstName} {patientDetails.lastName}</p>
                        <p><strong>Phone:</strong> {patientDetails.phone}</p>
                        <p><strong>Email:</strong> {patientDetails.email}</p>
                    </div>
                )}
            </ModalContainer>
        </Modal>


        
      </Wrapper>
    );
}



const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  outline: none;
  text-transform: none;
`;


const Wrapper = styled.section`
  padding: 120px 0;

  .image-wrapper {
  width: 70px;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.icon {
  cursor: pointer;
  font-size: 22px;
  margin-right: 10px;
  transition: color 0.2s ease-in-out;
}

.edit-icon {
  color: grey;
}

.edit-icon:hover {
  color: #3D96FF;
}

.delete-icon {
  color: grey;
}

.delete-icon:hover {
  color: red;
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
  text-align: left; // Align text to the left
  max-width: 500px;

  h3 {
    margin: 5px;
    text-align: center;
  }

  // You can add more styling here for the details
  p {
    margin: 5px 0;
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


export default AppointmentListsByDoc;