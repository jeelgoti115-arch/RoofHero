import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const isAuthenticated = () => {
  const token = localStorage.getItem('roofheroToken')
  const user = localStorage.getItem('roofheroUser')
  return Boolean(token && user)
}

const RequireAuth = ({ children }) => {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
