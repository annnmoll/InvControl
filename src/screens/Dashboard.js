import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import {FaCartShopping, FaCheckDouble, FaCircleCheck, FaStoreSlash} from 'react-icons/fa6'
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {
  const [dashboardData , setDashboardData] = useState({}) ; 
  const getData = async()=>{ 
    const token = localStorage.getItem("authToken") ; 
    const config = {headers : {authorization : `Bearer ${token}`}}

    await axios.get('http://localhost:5000/api/product/dashboard' , config)     
    .then(({data}) => setDashboardData(data.data))
    .catch(e =>{ toast.warn(e.response.data.message)})
  }


  useEffect(()=>{
    getData() ;
  } , [])
  return (
    <div className=' p-10 h-full max-h-[88vh] text-white grid md:grid-cols-2  gap-10'>
    <DashboardCard number={dashboardData.productCategory}title ="Product Category" Icon={FaCartShopping} color={"red-600"}  />
    <DashboardCard number={dashboardData.inStock}title ="In Stock" Icon={FaCircleCheck} />
    <DashboardCard number={dashboardData.outOfStock} title ="Out of Stock" Icon={FaStoreSlash} />
    <DashboardCard number={dashboardData.sold}title ="Sold" Icon={FaCheckDouble} />
    </div>
  )
}

export default Dashboard