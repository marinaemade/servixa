import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'

const WorkerLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default WorkerLayout