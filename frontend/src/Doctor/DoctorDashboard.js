import React from 'react'
import styled from 'styled-components'
import AppointmentList from './AppointmentList'

const DoctorDashboard = () => {
  return (
    <Wrapper>
        <AppointmentList/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export default DoctorDashboard