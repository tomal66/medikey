import React from 'react'
import styled from 'styled-components';
import AdminDashboardItems from './AdminDashboardItems';
const AdminDashboard = () => {
    const data = {
        name: "Dashboard",
      };
  return (
    
    <Wrapper>
      <AdminDashboardItems/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 70vh;
`;


export default AdminDashboard