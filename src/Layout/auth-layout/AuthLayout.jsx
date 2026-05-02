import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNavbar from '../../components/layout/auth-navbar/AuthNavbar'

const AuthLayout = () => {
  return (
    <div>
      <AuthNavbar/>
      <Outlet />
    </div>
  )
}

export default AuthLayout