
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute, AdminRoute } from './components/Routes/ProtectedRoutes';
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
import Listing from './pages/customer/Listing';
import { RentalProvider } from './contexts/RentalContext';
import { ListingProvider } from './contexts/ListingContext';
import MyListingDetails from './pages/customer/MyListingDetails';

function App() {
  return (
    <AuthProvider>
      <RentalProvider>
        <ListingProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index path="" element={<Home />} />
                <Route path="our-team" element={<OurTeam />} />
                <Route path="our-services" element={<OurServices />} />
                <Route path="contact-us" element={<ContactUs />} />
              </Route>

              <Route path='/auth' element={<AuthenticatoinLayout />} >
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>
              {/* Authentication Routes - wrap with PublicRoute */}
              <Route element={<PublicRoute />}>
              </Route>

              {/* Customer Routes - Protected
          <Route element={<ProtectedRoute />}>
          </Route> */}

              {/* Customer Routes */}
              <Route path='/customer' element={<CustomerLayout />}>
                <Route index path='' element={<CustomerHome />} />
                <Route path='listings/:id' element={<Listing />} />
                <Route path='rentals' element={<Rentals />} />
                <Route path='add-listing' element={<AddListing />} />
                <Route path='my-listings' element={<MyListings />} />
                <Route path='my-listings/edit/:id' element={<MyListingDetails />} />
              </Route>

              {/* Settings Routes */}
              <Route path='/settings' element={<CustomerSettingsLayout />}>
                <Route path='my-profile' element={<MyProfile />} />
                <Route path='personal-information' element={<PersonalInformation />} />
                <Route path='review' element={<Review />} />
                <Route path='verification' element={<Verification />} />
              </Route>

              {/* Admin Routes - wrap with AdminRoute */}
              <Route element={<AdminRoute />}>
                <Route path='/admin' element={<AdminLayout />}>
                  <Route path='' element={<Dashboard />} />
                </Route>
              </Route>

              {/* 404 Route */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </BrowserRouter>
        </ListingProvider>
      </RentalProvider>
    </AuthProvider>
  )
}

export default App
