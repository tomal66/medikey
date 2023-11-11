import React from 'react'
import styled from 'styled-components';
import MPDashboardItems from './MPDashboardItems';
const MPDashboard = () => {
    const data = {
        name: "Dashboard",
      };
  return (
    
    <Wrapper>
      <MPDashboardItems/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 70vh;
`;


export default MPDashboard