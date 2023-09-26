import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
//import SellerNav from './SellerNav';
//import { useAuthContext } from '../context/auth_context';
//import AdminNav from './AdminNav';
const Header = () => {
  //const { role } = useAuthContext();

  return (
    <MainHeader>
      <NavLink to="/">
        <img src="./Medikey_Logo 1.png" alt="MediKey" className='logo' />
      </NavLink>
      <Nav />
      {/* {role === 'ROLE_SELLER' ? (
        <SellerNav />
      ) : role === 'ROLE_ADMIN' ? ( // Check if the user has ROLE_ADMIN
        <AdminNav /> // Render AdminNav for admin user
      ) : (
        <Nav />
      )} */}
    </MainHeader>
  )
}

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
    width: 5rem;
    margin-left: 10rem;
  }
`;

export default Header