import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const AllHospitalsTable = () => {


    const [hospitals, setHospitals] = useState([
        {
          id: '1',
          name: 'Sample Hospital2',
          city: 'Sample City',
          phoneNumber: '123-456-7890'
        },
        {
            id: '2',
            name: 'Sample Hospital222',
            city: 'Sample City',
            phoneNumber: '123-456-7890'
          }
        
      ]); // Initialize state 
      
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

    const filteredHospitals = hospitals.filter(
        hospital =>
        hospital.id.toLowerCase().includes(search.toLowerCase()) ||
        hospital.name.toLowerCase().includes(search.toLowerCase()) ||
        hospital.city.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left',  },
        { field: 'name', headerName: 'Hospital Name', flex: 1, headerAlign: 'left', },
        { field: 'city', headerName: 'City', flex: 1, headerAlign: 'left',  },
        {
          field: 'phoneNumber',
          headerName: 'Phone',
          type: 'number',
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
          placeholder="Search Hospitals"
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

export default AllHospitalsTable;