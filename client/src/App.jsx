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
import RestaurantManagement from './pages/admin/RestaurantManagement'
import RestaurantParentComponent from './components/admin/RestaurantParentComponent';
// import FoodItemParentComponent from './components/admin/FoodItemParentComponent';
import MenuManagement from './pages/admin/MenuManagement';
import LogoutFallback from './pages/auth/LogoutFallback';
import OrderManagement from './pages/admin/OrderManagement';
import ClientLayout from './layouts/ClientLayout';
import Home from './pages/client/HomePage';
import Orders from './pages/client/Orders';
import Profile from './pages/client/Profile';
import Cart from './pages/client/Cart';


function App() {

  return (
    <>

      {/* <div className='p-2 mt-10 bg-color text-3xl'>
      Hello world 
    </div> */}

      <BrowserRouter>
        <Routes>

          <Route>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={<LogoutFallback />} />
          </Route>

          <Route path='/' element={<SharedSidebarLayout type="client" />}>
            {/* <Route path='/' element={<div className=''>Helloo </div>}/> */}
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path='orders' element={<OrdersPage/>}/> */}
            <Route path='/admin/restaurant-management' element={<RestaurantManagement />} />
            <Route path='/admin/menu' element={<MenuManagement />} />
            <Route path='/admin/orders' element={<OrderManagement />} />
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
