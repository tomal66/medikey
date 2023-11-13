import React from 'react'
import styled from 'styled-components'
import AllDoctorsTable from './AllDoctorsTable'

const AllDoctors = () => {
  return (
    <Wrapper>
        <AllDoctorsTable/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  /* background-color: ${({ theme }) => theme.colors.bg}; */
`;

export default AllDoctors