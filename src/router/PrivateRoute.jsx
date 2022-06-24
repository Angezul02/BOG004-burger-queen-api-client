import React from 'react'
import { Navigate } from 'react-router-dom';
import { userToken } from '../components/Login/Login';



const PrivateRoute = ({ children }) => {
    
    const tokenLogin = userToken;

  return (tokenLogin)
   ? children 
   : <Navigate to='/' />
}

export default PrivateRoute