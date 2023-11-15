import React from 'react'
import { useAuthContext } from '../context/auth_context'
import HistoryTable from '../Doctor/HistoryTable';

const MyHistory = () => {
  const {currentUser} = useAuthContext();

  return (
    <HistoryTable patientId={currentUser.patientId}/>
  )
}

export default MyHistory