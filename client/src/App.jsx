// import { useState } from 'react'
import React from 'react';
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import SharedSidebarLayout from './layouts/SharedSidebarLayout';
// import './index.css'

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/AdminDashboard';             // have to make it customizable
// import RestaurantManagement from './pages/admin/RestaurantManagement'
import RestaurantParentComponent from './components/admin/RestaurantParentComponent';
// import FoodItemParentComponent from './components/admin/FoodItemParentComponent';
import MenuManagement from './pages/admin/MenuManagement';








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
      {/* <Route path='/' element={<div className=''>Helloo </div>}/> */}
    <Route path='/api/v1/auth/register' element={<RegisterPage/>}/>
    <Route path='/api/v1/auth/login' element={<LoginPage/>}/>
    </Route>
    {/* Admin routes */}
    <Route path='/admin' element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}/>
      {/* <Route path='orders' element={<OrdersPage/>}/> */}
      <Route path='/admin/restaurant-management' element={<RestaurantParentComponent/>}/>
      <Route path='/admin/menu' element={<MenuManagement/>}/>
      {/* <Route path='menu' element={<MenuPage/>}/> */}
      {/* <Route path='settings' element={<SettingsPage/>}/> */}
      {/* Add more admin routes as needed */}

    </Route>
  </Routes>
  </BrowserRouter>

    </>
  );
}

export default App
