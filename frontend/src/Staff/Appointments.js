import React from 'react'
import AppointmentListsByDoc from './AppointmentListsByDoc';
import styled from 'styled-components';

const Appointments = () => {
  return (
    <Wrapper>
      <AppointmentListsByDoc/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export default Appointments