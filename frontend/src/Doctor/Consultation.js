import React from 'react'
import ConsultationForm from './ConsultationForm'
import styled from 'styled-components';

const Consultation = () => {

    const inputs = [
        { id: 1, label: 'Diagnosis', type: 'text', placeholder: 'Diagnosis' },
        
        // ... more inputs
      ];
      const title = 'Your Title';
  return (
    <Wrapper>
        <div className='container'>
            <ConsultationForm inputs={inputs} title={title}/>
        </div>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: "#FFFFFF";
`;


export default Consultation