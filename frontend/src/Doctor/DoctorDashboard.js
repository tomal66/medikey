import React from 'react'
import styled from 'styled-components'
import AppointmentList from './AppointmentList'
import DoctorDashboardItems from './DoctorDashboardItems'

const DoctorDashboard = () => {
  return (
    <Wrapper>
        <DoctorDashboardItems/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
`;

export default DoctorDashboard