// import { useState } from 'react'
import React from 'react';
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SharedSidebarLayout from './layouts/SharedSidebarLayout';
// import './index.css'



function App() {

  return (
    <>
    
    {/* <div className='p-2 mt-10 bg-color text-3xl'>
      Hello world 
    </div> */}

  <BrowserRouter>
  <Routes>
    <Route>
      <Route path='/' element={<SharedSidebarLayout/>}/>
      {/* <Route path='/' element={<div className=''>Heloo </div>}/> */}
    <Route path='/api/v1/auth/register' element={<RegisterPage/>}/>
    <Route path='/api/v1/auth/login' element={<LoginPage/>}/>

    </Route>
  </Routes>
  </BrowserRouter>


    </>
  )
}

export default App
