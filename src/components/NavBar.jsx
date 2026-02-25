import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="font-comfortaa bg-[#1f1f1f] text-[#eae6df] px-6 py-4 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="text-lg tracking-tight select-none">
          <span className='text-xl font-bold'>recipe</span>
          <span className="opacity-60">finder</span>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-[#A8B18A]' : 'opacity-70 hover:opacity-100 transition-opacity'}> Search </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'text-[#A8B18A]' : 'opacity-70 hover:opacity-100 transition-opacity'}>My Favorites</NavLink>
        </div>

      </div>
    </nav>
  )
}

export default NavBar