import React from 'react';
import styled from 'styled-components';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Medication = ({ medication, onDelete }) => {
  const { medicationName, dosage, frequency, duration } = medication;

  return (
    <Wrapper>
      <div className="medication-header">
        <h4 className="medication-name">{medicationName}</h4>
        <div className="medication-name">{dosage}</div>
        <FiTrash2
                  className="icon delete-icon"
                  onClick={() => onDelete(medicationName)}
                />
      </div>
      <p className="body">{frequency}</p>
      <p className="body">{duration}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px; 
  background-color: #fafafa;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1.5rem;
  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  .medication-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .medication-name {
    font-weight: bold;
    font-size: 1.5rem;
    color: #333;
  }

  .body {
    font-size: 1.5rem;
    color: #666;
    line-height: 1.6;
  }

  .icon {
  cursor: pointer;
  font-size: 2.2rem;
  margin-right: 1rem;
  transition: color 0.2s ease-in-out;
}
.delete-icon {
  color: grey;
}

.delete-icon:hover {
  color: red;
}
`;

export default Medication;