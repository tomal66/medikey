import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import TestAction from './TestAction';


const TestTable = ({ patientId }) => {
    const [tests, setTests] = useState([]);
    const [search, setSearch] = useState("");

    


    useEffect(() => {
      const fetchTests = async () => {
        try {
          const response = await fetch(`http://localhost:8567/api/test/patient/${patientId}`);
          const data = await response.json();
          const formattedData = data.map(item => ({ ...item, id: item.testId })).sort((a, b) => new Date(b.dateRecorded) - new Date(a.dateRecorded));
          setTests(formattedData);
        } catch (error) {
          console.error('Error fetching test data:', error);
        }
      };
  
      fetchTests();
    }, [patientId]);

    const filteredTests = tests.filter(
        test =>
          test.dateRecorded.toLowerCase().includes(search.toLowerCase()) ||
          test.testType.toLowerCase().includes(search.toLowerCase())
      );
      
  
    const columns = [
      { field: 'testType', headerName: 'Test Type', flex: 1 },
      { field: 'dateRecorded', headerName: 'Date Recorded', flex: 1 },
      { field: 'doctorName', headerName: 'Doctor Name', flex: 1 },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: .5,
        sortable: false,
        renderCell: (params) => (
            <TestAction id={params.row.id} testReport = {params.row.testReport}/>
        //     <FaExternalLinkAlt
        //     className="icon edit-icon"
        //     onClick={() => openPdfInNewTab('reports', params.row.id, params.row.fileName)}
        //   />
        ),
      },
    ];

  return (
    <Wrapper>
        <div className="container"> 
        <div className='search-container'>
            <TextField
            type="text"
            label="Search"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{
                marginBottom: '10px',           
            }}
            inputProps={{ 
            style: { textTransform: 'none',} }}
            />
        </div>
        
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            rows={filteredTests}
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
};

const Wrapper = styled.section`
  padding: 120px 0;

  .search-container {
    display: flex;
    justify-content: flex-start; /* Aligns content to the left */
    margin-bottom: 10px;
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
`;


export default TestTable;
