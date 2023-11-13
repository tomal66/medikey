import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const TestAction = ({ id, testReport }) => {
  const [isLoading, setLoading] = useState(false);

  const openPdfInNewTab = async (id, fileName) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8567/api/storage/view/reports/${id}/${fileName}`, {
        responseType: 'blob' // Important: This tells Axios to handle the response as a Blob
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;

    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
    setLoading(false);
};

  return (
    <div>
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <StyledIcon
          onClick={() => openPdfInNewTab(id, testReport)}
        />
      )}
    </div>
  );
};


const StyledIcon = styled(FaExternalLinkAlt)`
  cursor: pointer;
  font-size: 22px;
  margin-right: 10px;
  transition: color 0.2s ease-in-out;
  color: grey;

  &:hover {
    color: #3D96FF;
  }
`;

export default TestAction;
