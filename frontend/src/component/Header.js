import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import { useAuthContext } from '../context/auth_context';
import PatientNav from './PatientNav';
import MuiNavBar from './MuiNavBar';
import AdminNav from './AdminNav';
import HospitalNav from './HospitalNav';

const Header = ({toggleChatbot}) => {
  const { role } = useAuthContext();

  return (
      <>
      {role === 'ROLE_PATIENT' ? (
            <PatientNav toggleChatbot={toggleChatbot}/>

      ) : role === 'ROLE_ADMIN' ? ( // Check if the user has ROLE_ADMIN
        <AdminNav /> // Render AdminNav for admin user
      ) : role === 'ROLE_HOSPITAL' ? ( // Check if the user has ROLE_ADMIN
        <HospitalNav /> // Render AdminNav for admin user
      ) : (
        <MuiNavBar toggleChatbot={toggleChatbot}/>
      )}
      </>
  )
}

const MainHeader = styled.header`
  padding: 0 48px;
  height: 100px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1301;  // Add this line to set z-index above the drawer's z-index (which is typically 1300)

  .logo {
    height: 50px;
    width: 50px;
    margin-left: 100px;
  }
`;


export default Header