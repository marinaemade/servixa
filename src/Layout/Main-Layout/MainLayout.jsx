import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../../components/navbar/Nav'
import Footer from '../../components/footer/Footer'

const MainLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout