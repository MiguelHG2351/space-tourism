// import { renderRoutes } from 'react-router-config'
// import { Outlet } from 'react-router-dom'
import React from 'react'
import Header from './Header'

export default function Layout({ children }) {

  return (
    <>
        <Header />
        {children}
        {/* {renderRoutes(route.routes)} */}
    </>
  )
}
