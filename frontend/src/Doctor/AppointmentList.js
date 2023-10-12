import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const AppointmentList = () => {


    const [appoitnments, setAppointments] = useState([
        {
            "id": "1",
            "name": "John Doe",
            "arrivedAt": "10:30",
            "reason": "General Check-up",
            "actions": ""
        },
        {
            "id": "2",
            "name": "Jane Smith",
            "arrivedAt": "11:00",
            "reason": "Dental Cleaning",
            "actions": ""
        },
        {
            "id": "3",
            "name": "Emily Johnson",
            "arrivedAt": "12:45",
            "reason": "X-ray",
            "actions": ""
        },
        {
            "id": "4",
            "name": "Michael Brown",
            "arrivedAt": "13:20",
            "reason": "Vaccination",
            "actions": ""
        },
        {
            "id": "5",
            "name": "Sarah Williams",
            "arrivedAt": "15:15",
            "reason": "Eye Exam",
            "actions": ""
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
    nav(`/consult/${id}`);
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
                checkboxSelection
                classes={'datagrid'}
            />
            </div>
        
        </div>
        
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

export default AppointmentList;