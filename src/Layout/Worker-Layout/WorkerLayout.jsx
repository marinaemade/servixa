import React from 'react'
import { Outlet } from 'react-router-dom'
import UserProfileHeader from '../../components/layout/user-profile-header/UserProfileHeader'

const WorkerLayout = () => {
  return (
    <div>
      <UserProfileHeader/>
      <div className="pt-16 md:pt-20">
        <Outlet />
      </div>
    </div>
  )
}

export default WorkerLayout