import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const AllDoctorsTable = () => {


    const [doctors, setDoctors] = useState([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          department: 'CARDIOLOGY',
          email: 'john.doe@example.com',
          phone: '123-456-7890'
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          department: 'ORTHOPEDICS',
          email: 'jane.doe@example.com',
          phone: '098-765-4321'
        },
        {
          id: '3',
          firstName: 'Emily',
          lastName: 'Smith',
          department: 'NEUROMEDICINE',
          email: 'emily.smith@example.com',
          phone: '111-222-3333'
        },
        {
          id: '4',
          firstName: 'Robert',
          lastName: 'Brown',
          department: 'ENDOCRINOLOGY',
          email: 'robert.brown@example.com',
          phone: '444-555-6666'
        },
        {
          id: '5',
          firstName: 'Karen',
          lastName: 'Williams',
          department: 'DERMATOLOGY',
          email: 'karen.williams@example.com',
          phone: '777-888-9999'
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

    const filteredDoctors = doctors.filter(
        doctor =>
        doctor.id.toLowerCase().includes(search.toLowerCase()) ||
        doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left',  },
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
            flex: 1,
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
        <SearchInput
          type="text"
          placeholder="Search Doctors"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ height: 400, width: '100%',}}>
            <DataGrid
                sx={{
                    
                    fontSize: '1.4rem',
                    
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
                checkboxSelection
                classes={'datagrid'}
            />
            </div>
        
        </div>
        
      </Wrapper>
    );
}



const SearchInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  outline: none;
  text-transform: none;
`;


const Wrapper = styled.section`
  padding: 12rem 0;

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
  font-size: 2.2rem;
  margin-right: 1rem;
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