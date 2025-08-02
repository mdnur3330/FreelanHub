import React from 'react'
import Navbar from '../Component/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Component/Footer'

export default function Root1() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar></Navbar>
        <main className='flex-1'>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
    </div>
  )
}
