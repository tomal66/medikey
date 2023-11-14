import React from 'react'
import styled from 'styled-components'
import AllDoctorsTable from './AllDoctorsTable'
import AllMPsTable from './AllMPsTable'

const AllMPs = () => {
  return (
    <Wrapper>
        <AllMPsTable/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  /* background-color: ${({ theme }) => theme.colors.bg}; */
`;

export default AllMPs