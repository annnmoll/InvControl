import React from 'react'

function DashboardCard({ title, Icon, number , color }) {
  return (
    <div className={`w-100% p-10 rounded-xl bg-blue-600 bg-${color} grid grid-rows-3 `}>
      <p className='w-full text-center text-[2rem]'>{title}</p>
      {Icon && <Icon className='  w-full h-[100px] pt-5 ' />}
      <p className=' text-[1.5rem] flex  justify-center items-end font-black'>{number}</p>
    </div>
  )
}

export default DashboardCard