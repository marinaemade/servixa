import React from 'react'
import { Outlet } from 'react-router-dom'
import UserProfileHeader from '../../components/layout/user-profile-header/UserProfileHeader'

const ClientLayout = () => {
  return (
    <div>
      <UserProfileHeader />
      <Outlet />
    </div>
  )
}

export default ClientLayout