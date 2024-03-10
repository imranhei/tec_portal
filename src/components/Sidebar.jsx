import React from 'react'
import {Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='h-full p-4 border flex flex-col'>
        <img src="/tec_logo.png" alt="" className='w-24 mx-auto pb-4'/>
        <Link className='hover:bg-gray-200 p-2' to="/projects">Projects</Link>
        <Link className='hover:bg-gray-200 p-2' to="/employee">Employee</Link>
        <Link className='hover:bg-gray-200 p-2' to="/register">Register</Link>
        <Link className='hover:bg-gray-200 p-2' to="/login">Logout</Link>
    </div>
  )
}
