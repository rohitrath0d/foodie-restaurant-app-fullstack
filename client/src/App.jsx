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
import Orders from './pages/client/Orders';
import Profile from './pages/client/Profile';
import Cart from './pages/client/Cart';
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from './components/ui/sonner';
import NotFoundPage from './components/NotFoundPage';
import LandingPage from './components/LandingPage';
import HomePage from './pages/client/HomePage';


function App() {

  return (
    <>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>

            {/* Landing Page */}
            {/* <Route path="/landing-page" element={<LandingPage />} /> */}
            <Route path="/" element={<LandingPage />} />

            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={<LogoutFallback />} />

            <Route path='/sidebar' element={<SharedSidebarLayout type="client" />}/>
              {/* <Route index element={<Home />} /> */}
              {/* <Route index element={<HomePage />} /> */}
              <Route path='/home-page' element={<HomePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            {/* </Route> */}

            {/* Admin routes */}
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              {/* <Route path='orders' element={<OrdersPage/>}/> */}

              {/* Since it's already nested under path='/admin', you should remove the leading slash:
            React Router treats path="/..." as absolute, and path="..." as relative to parent. */}


              {/* <Route path='/admin/restaurant-management' element={<RestaurantManagement />} /> */}
              <Route path='restaurant-management' element={<RestaurantManagement />} />
              {/* <Route path='/admin/menu' element={<MenuManagement />} /> */}
              <Route path='menu-management' element={<MenuManagement />} />
              {/* <Route path='/admin/orders' element={<OrderManagement />} /> */}
              <Route path='order-management' element={<OrderManagement />} />
              {/* <Route path='menu' element={<MenuPage/>}/> */}
              {/* <Route path='settings' element={<SettingsPage/>}/> */}
              {/* Add more admin routes as needed */}
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </BrowserRouter>

        <Toaster position="top-right" />
      </TooltipProvider>
    </>
  );
}

export default App
