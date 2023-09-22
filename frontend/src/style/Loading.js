import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${({ theme }) => theme.colors.btn};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${loading} 0.8s linear infinite;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
};

export default Loading;
