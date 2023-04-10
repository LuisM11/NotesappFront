import React from 'react'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-t from-[#bdc3c7] to-[#2c3e50] grid grid-rows-[minmax(80px,_1fr)_minmax(500px,_7fr)] gap-y-4'>
        <Outlet/>
    </div>
  )
}
