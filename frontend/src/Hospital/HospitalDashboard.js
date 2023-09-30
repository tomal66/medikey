import React from 'react'
import styled from 'styled-components';
import HospitalDashboardItems from './HospitalDashboardItems';
const HospitalDashboard = () => {
    const data = {
        name: "Dashboard",
      };
  return (
    
    <Wrapper>
      <HospitalDashboardItems/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 70vh;
`;


export default HospitalDashboard