import React from 'react'
import { useAuthContext } from '../context/auth_context'
import TestTable from '../Doctor/TestTable';

const MyTest = () => {
    const {currentUser} = useAuthContext();
  return (
    <TestTable patientId={currentUser.patientId}/>
  )
}

export default MyTest