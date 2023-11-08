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

const AppointmentList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

    const [appoitnments, setAppointments] = useState([
        {
            "id": "1",
            "name": "John Doe",
            "arrivedAt": "10:30",
            "reason": "General Check-up",
            "actions": "",
            "code": "739444"
        },
        {
            "id": "2",
            "name": "Jane Smith",
            "arrivedAt": "11:00",
            "reason": "Dental Cleaning",
            "actions": "",
            "code": "739404"
        },
        {
            "id": "3",
            "name": "Emily Johnson",
            "arrivedAt": "12:45",
            "reason": "X-ray",
            "actions": "",
            "code": "739444"
        },
        {
            "id": "4",
            "name": "Michael Brown",
            "arrivedAt": "13:20",
            "reason": "Vaccination",
            "actions": "",
            "code": "739444"
        },
        {
            "id": "5",
            "name": "Sarah Williams",
            "arrivedAt": "15:15",
            "reason": "Eye Exam",
            "actions": "",
            "code": "739444"
        }        
      ]);
      
      
      
    const [search, setSearch] = useState(""); // Add this line

    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/hospital/all')
    //       .then(response => {
    //         setHospitals(response.data); 
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //       });
    //   }, []);

    const filteredAppointments = appoitnments.filter(
        appointment =>
        appointment.id.toLowerCase().includes(search.toLowerCase()) ||
        appointment.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left',  },
        { field: 'name', headerName: 'Patient Name', flex: 1, headerAlign: 'left', },
        { field: 'arrivedAt', headerName: 'Arrived at', type: 'time', flex: 1, headerAlign: 'left', },
        { field: 'reason', headerName: 'Reason', flex: 1, headerAlign: 'left', },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
              <>
                <AiFillEye
                  className="icon edit-icon"
                  onClick={() => handleView(params.row.id)} // Assumes 'id' is the unique identifier for each row
                />
              </>
            ),
          },
      ];

  const nav = useNavigate();
  const handleView = (id) => {
    const appointment = appoitnments.find((a) => a.id === id);
    setSelectedAppointment(appointment);
    setModalOpen(true);
    //nav(`/consult/${id}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setShowAlert(false);  // Set the alert to be false whenever the modal is closed
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    setIsLoading(true);  // Begin loading state

    if (selectedAppointment && decodedText === selectedAppointment.code) {
        setIsLoading(false); // End loading state before navigation
        closeModal();
        nav(`/consult/${selectedAppointment.id}`);
    } else {
        setIsLoading(false); // End loading state before showing the alert
        setShowAlert(true);
    }
  };


    
  
    return (
      <Wrapper>
        <div className="container"> 
        <SearchInput
          type="text"
          placeholder="Search Patient"
          value={search}
          onChange={e => setSearch(e.target.value)}
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
          disableScrollLock
          open={isModalOpen}
          onClose={closeModal}  // Modified the onClose to use the closeModal function
        >
            <ModalContainer>
                <h3>Appointment Authentication</h3>
                <div>
                  {isLoading ? (
                      <Loading />
                  ) : showAlert ? (
                      <>
                          <Alert>The scanned code does not match!</Alert>
                          <Button variant="contained" color="primary" onClick={closeModal}>Close</Button>
                      </>
                  ) : (
                      <Html5QrcodePlugin
                          fps={10}
                          qrbox={250}
                          disableFlip={false}
                          qrCodeSuccessCallback={onNewScanResult}
                      />
                  )}
              </div>

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
  text-align: center;
  max-width: 500px;
  
  h3 {
    margin: 5px;
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


export default AppointmentList;