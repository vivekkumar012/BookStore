import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-between p-5'>
      <div className='text-2xl font-semibold cursor-pointer'>BookStore</div>
      <div>
        <ul className="flex items-center space-x-3 rounded-2xl cursor-pointer text-xl">
          <li><Link className='text-shadow-amber-50 font-sans'>Home</Link></li>
          <li><Link className='text-shadow-amber-50 font-sans'>Courses</Link></li>
          <li><Link className='text-shadow-amber-50 font-sans'>Contact</Link></li>
          <li><Link className='text-shadow-amber-50 font-sans'>About</Link></li>
        </ul>
      </div>
      <div>
        <Link to={"/login"} className='border rounded-md px-4 py-2 text-black hover:bg-blue-800 hover:text-white'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar
