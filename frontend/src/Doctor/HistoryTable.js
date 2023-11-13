import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';

const HistoryTable = ({ patientId }) => {
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8567/api/patients/history/${patientId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedData = data.map(item => ({ ...item, id: item.visitId }));
          setMedicalHistories(formattedData.sort((a, b) => new Date(b.dateRecorded) - new Date(a.dateRecorded)));
        } else {
          setMedicalHistories([]); 
        }
      } catch (error) {
        console.error('Error fetching medical history:', error);
        setMedicalHistories([]); 
      }
    };
  
    fetchMedicalHistory();
  }, [patientId]);

  const filteredHistories = medicalHistories.filter(
    history =>
      history.visitDate.toLowerCase().includes(search.toLowerCase()) ||
      history.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      history.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
      history.diagnosis.toLowerCase().includes(search.toLowerCase())
  );
  

  const columns = [
    { field: 'visitDate', headerName: 'Visit Date', flex: 1 },
    { field: 'doctorName', headerName: 'Doctor Name', flex: 1 },
    { field: 'hospitalName', headerName: 'Hospital', flex: 1 },
    { field: 'symptoms', headerName: 'Symptoms', flex: 1 },
    { field: 'diagnosis', headerName: 'Diagnosis', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: .5,
      sortable: false,
      renderCell: (params) => (
        <AiFillEye
          className="icon edit-icon"
          onClick={() => handleView(params.row.id)}
        />
      ),
    },
  ];

  const handleView = (id) => {
    const history = medicalHistories.find((h) => h.visitId === id);
    setSelectedHistory(history);
    setModalOpen(true);
  };

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
              style: { textTransform: 'none' }
            }}
          />
        </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredHistories}
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
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ModalContainer>
          <h3>Medical History Details</h3>
          {selectedHistory && (
            <div>
            <p>Doctor: {selectedHistory.doctorName}</p>
            <p>Hospital: {selectedHistory.hospitalName}</p>
            <p>Visit Date: {selectedHistory.visitDate}</p>
            <p>Symptoms: {selectedHistory.symptoms}</p>
            <p>Diagnosis: <strong>{selectedHistory.diagnosis}</strong></p>
            <p>Notes: {selectedHistory.notes}</p>
            <p>Medications:</p>
              {selectedHistory.medications.map(med => (
                <MedicationInfo>
                  <span className="medication-name">
                    {med.medicationName}({med.dosage})
                  </span>
                  <span className="spacing">{med.frequency}</span>
                  <span className="spacing">{med.duration}</span>
                </MedicationInfo>
              
              ))}
          </div>
          )}
        </ModalContainer>
      </Modal>
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
  text-align: left; /* Align text to the left */
  max-width: 500px;

  h3 {
    margin-bottom: 15px;
  }

  p, ul {
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px; /* Add padding for list */
  }

  li {
    margin-bottom: 5px; /* Space between list items */
  }
`;

const MedicationInfo = styled.p`
  margin-left: 4px; /* Start 4 spaces from left */
  font-weight: normal; /* Default font weight */

  .medication-name {
    font-weight: bold; /* Make medication name and dosage bold */
  }

  .spacing {
    margin-left: 4px; /* Spacing between elements */
  }
`;



export default HistoryTable;
