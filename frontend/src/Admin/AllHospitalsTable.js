import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const AllHospitalsTable = () => {


  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
      axios.get('http://localhost:8567/api/hospitals')
        .then(response => {
          const formattedData = response.data.map(hospital => ({
            ...hospital,
            id: hospital.hospitalId
          }));
          setHospitals(formattedData);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);


    const filteredHospitals = hospitals.filter(
        hospital =>
        hospital.id.toString().toLowerCase().includes(search.toLowerCase()) ||
        hospital.name.toLowerCase().includes(search.toLowerCase()) ||
        hospital.city.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', flex: .3, headerAlign: 'left',  },
        { field: 'name', headerName: 'Hospital Name', flex: 1, headerAlign: 'left', },
        { field: 'city', headerName: 'City', flex: .7, headerAlign: 'left',  },
        {
          field: 'phoneNumber',
          headerName: 'Phone',
          type: 'phone',
          flex: 1,
          headerAlign: 'left',
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'phone',
          flex: 1,
          headerAlign: 'left',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: .5,
            sortable: false,
            renderCell: (params) => (
              <>
                <FiEdit2 
                  className="icon edit-icon" 
                  onClick={() => handleEdit(params.row.id)}
                />
              </>
            ),
          },
      ];

  const nav = useNavigate();
  const handleEdit = (id) => {
    nav(`/edit-hospital/${id}`);
  };

    
  
    return (
      <Wrapper>
        <div className="container"> 
        <TextField
          type="text"
          label="Search Hospitals"
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

                rows={filteredHospitals}
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

export default AllHospitalsTable;