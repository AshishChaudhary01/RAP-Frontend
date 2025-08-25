import { BrowserRouter, Route, Routes } from 'react-router'

import './App.css'
import PublicLayout from './layouts/PublicLayout'
import CustomerLayout from './layouts/CustomerLayout'
import CustomerHome from './pages/customer/CustomerHome'
import Rentals from './pages/customer/Rentals'
import AddListing from './pages/customer/AddListing'
import MyListings from './pages/customer/MyListings'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/public/Home'
import OurServices from './pages/public/OurServices'
import ContactUs from './pages/public/ContactUs'
import OurTeam from './pages/public/OurTeam'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import AuthenticatoinLayout from './layouts/AuthenticatoinLayout'
import Dashboard from './pages/admin/Dashboard'
import CustomerSettingsLayout from './layouts/CustomerSettingsLayout'
import MyProfile from './pages/customer/settings/MyProfile'
import PersonalInformation from './pages/customer/settings/PersonalInformation'
import Review from './pages/customer/settings/Review'
import Verification from './pages/customer/settings/Verification'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routing */}
          <Route path="/" element={<PublicLayout />}>
            <Route path="" element={<Home />} />
            <Route path="our-team" element={<OurTeam />} />
            <Route path="our-services" element={<OurServices />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>

          {/* Authentication Routing */}
          <Route path='/auth' element={<AuthenticatoinLayout />} >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/* Customer Routing */}
          <Route path='/customer' element={<CustomerLayout />}>
            <Route path='' element={<CustomerHome />} />
            <Route path='rentals' element={<Rentals />} />
            <Route path='add-listing' element={<AddListing />} />
            <Route path='my-listings' element={<MyListings />} />
          </Route>

          {/* Customer Settings Layout */}
          <Route path='settings' element={<CustomerSettingsLayout />}>
            <Route path='my-profile' element={<MyProfile />} />
            <Route path='personal-information' element={<PersonalInformation />} />
            <Route path='review' element={<Review />} />
            <Route path='verification' element={<Verification />} />
          </Route>

          {/* Admin Routing */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
