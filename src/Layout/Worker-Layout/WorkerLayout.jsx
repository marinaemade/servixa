import React from 'react'
import { Outlet } from 'react-router-dom'

const WorkerLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default WorkerLayout