import React from 'react';
import styled from 'styled-components';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Medication = ({ medication, onDelete }) => {
  const { medicationName, dosage, frequency, duration } = medication;

  return (
    <Wrapper>
      <h4 className="medication-name">{medicationName}</h4>
      <div className="info">{dosage}</div>
      <p className="body">{frequency}</p>
      <p className="body">{duration}</p>
      <FiTrash2
        className="icon delete-icon"
        onClick={() => onDelete(medicationName)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 91%;
  background-color: #fafafa;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  .medication-name {
    font-weight: bold;
    font-size: 15px;
    color: #333;
    flex: 1;
  }

  .info {
    font-size: 15px;
    color: #666;
    margin: 0 10px;
    flex:2
  }

  .body {
    font-size: 15px;
    color: #666;
    margin: 0 10px;
    line-height: 1.6;
    flex:1;
    font-weight: bold;
  }

  .icon {
    cursor: pointer;
    font-size: 22px;
    margin-right: 10px;
    transition: color 0.2s ease-in-out;
  }

  .delete-icon {
    color: grey;
  }

  .delete-icon:hover {
    color: red;
  }

  &:hover {
    background-color: #f0f0f0;  // Slightly darker background on hover
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15), 0 3px 5px -1px rgba(0, 0, 0, 0.1);  // Slightly bigger shadow on hover
  }
`;

export default Medication;
