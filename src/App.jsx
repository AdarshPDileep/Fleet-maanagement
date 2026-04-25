import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Layouts
import ProviderLayout from './layouts/ProviderLayout'

// Pages
import HomePage from './pages/HomePage'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Provider Pages
import PartnerLandingPage from './pages/Provider/PartnerLandingPage'
import DriverManager from './pages/Provider/DriverManager'
import VehicleManager from './pages/Provider/VehicleManager'
import TripManager from './pages/Provider/TripManager'
import ProviderDashboard from './pages/Provider/ProviderDashboard'
import DriverDashboard from './pages/Provider/DriverDashboard'
import OwnerDashboard from './pages/Provider/OwnerDashboard'

// Customer Components
import VehicleDetailPage from './pages/VehicleDetailPage'
import VehicleRentPage from './pages/VehicleRentPage'
import RentalConfirmationPage from './pages/RentalConfirmationPage'
import RentalDetailsPage from './pages/RentalDetailsPage'
import PackageDetailPage from './pages/PackageDetailPage'
import MyPackagesPage from './pages/MyPackagesPage'
import TrackingPage from './pages/TrackingPage'

import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/Customer Routes (With Global Navbar/Footer) */}
        <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
        <Route path="/vehicle/:id" element={<><Navbar /><VehicleDetailPage /><Footer /></>} />
        <Route path="/rent/:id" element={<><Navbar /><VehicleRentPage /><Footer /></>} />
        <Route path="/rent-confirmation" element={<><Navbar /><RentalConfirmationPage /><Footer /></>} />
        <Route path="/rentals" element={<><Navbar /><RentalDetailsPage /><Footer /></>} />
        <Route path="/package/:id" element={<><Navbar /><PackageDetailPage /><Footer /></>} />
        <Route path="/my-packages" element={<><Navbar /><MyPackagesPage /><Footer /></>} />
        <Route path="/track" element={<><Navbar /><TrackingPage /><Footer /></>} />
        <Route path="/partner" element={<><Navbar /><PartnerLandingPage /><Footer /></>} />

        {/* Provider Portal Routes (With Sidebar Layout, No Global Navbar/Footer) */}
        <Route element={<ProviderLayout />}>
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/partner/driver-register" element={<DriverManager />} />
          <Route path="/partner/vehicle-register" element={<VehicleManager />} />
          <Route path="/partner/trip-register" element={<TripManager />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        </Route>

        {/* Legacy/Redirect Routes */}
        <Route path="/register-driver" element={<><Navbar /><DriverManager /><Footer /></>} />
        <Route path="/register-vehicle" element={<><Navbar /><VehicleManager /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App