import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../redux/auth';

export default function Sidebar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.user)

  return (
    <div className='h-full p-4 border-r flex flex-col'>
        <img src="/tec_logo.png" alt="" className='w-24 mx-auto pb-4'/>
        {user === "admin" && <><Link className='hover:bg-gray-200 p-2 border-b' to="/projects">Projects</Link>
        <Link className='hover:bg-gray-200 p-2 border-b' to="/employee">Employee</Link>
        <Link className='hover:bg-gray-200 p-2 border-b' to="/register">Register</Link></>}
        {user === "user" && <><Link className='hover:bg-gray-200 p-2 border-b' to="/current-jobs">Current Jobs</Link>
        <Link className='hover:bg-gray-200 p-2 border-b' to="/history">History</Link></>}
        <Link className='hover:bg-gray-200 p-2 border-b' to="/profile">Profile</Link>
        <Link className='hover:bg-gray-200 p-2 border-b' to="/login" onClick={() => dispatch(setLoggedIn(false))}>Logout</Link>
    </div>
  )
}
