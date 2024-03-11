import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/auth';

export default function Sidebar() {
  const dispatch = useDispatch()
  return (
    <div className='h-full p-4 border flex flex-col'>
        <img src="/tec_logo.png" alt="" className='w-24 mx-auto pb-4'/>
        <Link className='hover:bg-gray-200 p-2' to="/projects">Projects</Link>
        <Link className='hover:bg-gray-200 p-2' to="/employee">Employee</Link>
        <Link className='hover:bg-gray-200 p-2' to="/profile">Profile</Link>
        <Link className='hover:bg-gray-200 p-2' to="/register">Register</Link>
        <Link className='hover:bg-gray-200 p-2' to="/login" onClick={() => dispatch(setLoggedIn(false))}>Logout</Link>
        <Link className='hover:bg-gray-200 p-2' to="/current-jobs">Current Jobs</Link>
        <Link className='hover:bg-gray-200 p-2' to="/history">History</Link>
    </div>
  )
}
