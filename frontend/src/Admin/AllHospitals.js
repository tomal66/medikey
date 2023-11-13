import React from 'react'
import AllHospitalsTable from './AllHospitalsTable'
import styled from 'styled-components'

const AllHospitals = () => {
  return (
    <Wrapper>
        <AllHospitalsTable/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  /* background-color: ${({ theme }) => theme.colors.bg}; */
`;

export default AllHospitals