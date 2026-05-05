import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/layout/home-navbar/Header'
import Footer from '../../components/layout/home-footer/Footer'
const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout