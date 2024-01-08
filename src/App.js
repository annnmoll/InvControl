import React, { useEffect, useState } from 'react'
import Home from './screens/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Register from './screens/Register'
import Inventory from './screens/Inventory'
import ProductInfo from './screens/ProductInfo'
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedIn, setLogin } from './redux/slices/loginSlice'
import CreateStock from './screens/CreateStock'
import SellStock from './screens/SellStock'
import AllUsers from './screens/AllUsers'
import Dashboard from './screens/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import NotAuthrized from './screens/NotAuthrized'
// import { loading, toggleLoading } from './redux/slices/loadingSlice'


function App() {

  const login = useSelector(isLoggedIn)
  const dispatch = useDispatch();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) ; 

  useEffect(() => { ; if (localStorage.getItem('authToken')) { dispatch(setLogin(true)) } })



  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }



  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className='main-container'>
        <Routes>
          <Route exact path='/' element={login ? <Inventory /> : <Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/info' element={  userInfo ? <ProductInfo /> : <NotAuthrized />} />
          <Route path='/stock' element={ userInfo?.role === "Admin" ? <CreateStock /> : <NotAuthrized /> } />
          <Route path='/sellstock' element={ userInfo ? <SellStock /> : <NotAuthrized />} />
          <Route path='/allusers' element={ userInfo?.role === "Admin" ?  <AllUsers /> : <NotAuthrized />} />
          <Route path='/dashboard' element={ userInfo ? <Dashboard /> : <NotAuthrized />} />
    

        </Routes>
      </div>


      {/* <Nav />
    
    
      <div className='flex-auto'>
        
      </div> */}
    </div>

  )
}

export default App