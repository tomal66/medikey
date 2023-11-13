import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Modal } from '@mui/material';

const MedicationTable = () => {
  const [medicalHistories, setMedicalHistories] = useState([
    {
      id: 1,
      dateRecorded: '2023-01-01',
      diagnosis: 'Flu',
      symptoms: 'Fever, cough',
      chronicDiseases: 'None',
    },
    {
      id: 2,
      dateRecorded: '2023-02-15',
      diagnosis: 'Asthma',
      symptoms: 'Shortness of breath',
      chronicDiseases: 'Asthma',
    },
    // Add more dummy data here
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const columns = [
    { field: 'dateRecorded', headerName: 'Date Recorded', flex: 1 },
    { field: 'diagnosis', headerName: 'Diagnosis', flex: 1 },
    { field: 'symptoms', headerName: 'Symptoms', flex: 1 },
    { field: 'chronicDiseases', headerName: 'Chronic Diseases', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
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
    const history = medicalHistories.find((h) => h.id === id);
    setSelectedHistory(history);
    setModalOpen(true);
  };

  return (
    <Wrapper>
        <div className="container"> 
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={medicalHistories}
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
              <p>Date Recorded: {selectedHistory.dateRecorded}</p>
              <p>Diagnosis: {selectedHistory.diagnosis}</p>
              <p>Symptoms: {selectedHistory.symptoms}</p>
              <p>Chronic Diseases: {selectedHistory.chronicDiseases}</p>
              {/* Add more fields here */}
            </div>
          )}
        </ModalContainer>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 120px 0;

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
  text-align: center;
  max-width: 500px;
`;

export default MedicationTable;
