import React from 'react'
import { Navigate } from 'react-router-dom'
import authService from '../services/authService';

function Protected({ children }) {
  const token = authService.getToken();
  
  return (
    token ? children : <Navigate to='/login' replace/>
  )
}

export default Protected
