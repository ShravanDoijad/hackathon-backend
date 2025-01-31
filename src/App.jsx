import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home'
import Sports from './pages/sports'
import Login from './pages/Login'
import Register from './pages/Register'

import AdventureDetails from './pages/AdventureDetails'
import FinalBooking from './pages/FinalBooking'


function App() {
 

  return (
    
    <div className="container">
      <Routes>
        
        <Route path='/' element= {<Home/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/sports' element ={<Sports/>}/>
        <Route path='/register' element ={<Register/>}/>
        
        
        
       <Route path='/final-booking' element={<FinalBooking/>}/>
       <Route path='/adventure-details' element={<AdventureDetails/>}/>
       
      
      


        

        
      </Routes>
      <Navbar/>
      
        
       
     
    </div>
  )
}

export default App
