import React from 'react'
import { BsJustify }
  from 'react-icons/bs'

function Header({ OpenSidebar }) {
  return (
    <header className='header text-center align-right'>
      <div className='menu-icon text-white'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='text-white w-full text-[2em]'>
        Inventory Management
      </div>
    </header>
  )
}

export default Header