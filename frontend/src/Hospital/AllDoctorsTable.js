import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, FormControl, MenuItem } from '@mui/material';
import { useAuthContext } from '../context/auth_context';


const AllDoctorsTable = () => {

  const {currentUser} = useAuthContext();
  const [doctors, setDoctors] = useState([]);
  const authState = JSON.parse(localStorage.getItem("authState"));
  const hospitalId = authState?.currentUser?.hospitalId;


  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8567/api/doctors/hospital/${hospitalId}`);
  //       setDoctors(response.data);
  //       console.log(hospitalId)
  //     } catch (error) {
  //       console.error("Error fetching doctors:", error);
  //       // Handle error here, e.g., set error message in state
  //     }
  //   };

  //   fetchDoctors();
  // }, []);
      
      
      
    const [search, setSearch] = useState(""); // Add this line

    useEffect(() => {
      // Ensure currentUser is available before making the call
      if (hospitalId) {
        axios.get(`http://localhost:8567/api/doctors/hospital/${hospitalId}`)
          .then(response => {
            const dataWithIds = response.data.map((doctor) => ({
              ...doctor,
              id: doctor.doctorId,
            }));
            setDoctors(dataWithIds); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.error('currentUser or hospitalId is undefined');
      }
    }, []);
    

    const filteredDoctors = doctors.filter(
        doctor =>
        doctor.doctorId === Number(search) ||
        doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', flex: .5, headerAlign: 'left',  },
        { field: 'firstName', headerName: 'First Name', flex: 1, headerAlign: 'left', },
        { field: 'lastName', headerName: 'Last Name', flex: 1, headerAlign: 'left', },
        { field: 'department', headerName: 'Department', flex: 1, headerAlign: 'left', },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            flex: 1,
            headerAlign: 'left',
          },
        {
          field: 'phone',
          headerName: 'Phone',
          type: 'phone',
          flex: 1,
          headerAlign: 'left',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: .7,
            sortable: false,
            renderCell: (params) => (
              <>
                <AiFillEye
                  className="icon edit-icon"
                  onClick={() => handleView(params.row.id)} // Assumes 'id' is the unique identifier for each row
                />
                <FiEdit2 
                  className="icon edit-icon" 
                  // Add your edit logic here
                />
                <FiTrash2
                  className="icon delete-icon"
                  // Add your delete logic here
                />
              </>
            ),
          },
      ];

  const nav = useNavigate();
  const handleView = (id) => {
    nav(`/singleHospital/${id}`);
  };

    
  
    return (
      <Wrapper>
        <div className="container"> 
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
        <div style={{ height: 400, width: '100%',}}>
            <DataGrid
                sx={{
                    
                    fontSize: '14px',
                    
                    boxShadow: 2,
                    border: 0,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}

                rows={filteredDoctors}
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

export default AllDoctorsTable;