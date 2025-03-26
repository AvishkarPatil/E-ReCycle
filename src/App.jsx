import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Classify from './pages/Classify';
import Marketplace from './pages/Market';
import Donate from './pages/Donate';
import Dispose from './pages/Dispose';
import Repair from './pages/Repair';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import OrganizationSelect from './pages/OrganizationSelect';
import DonationConfirmation from './pages/DonationConfirmation';
import DisposalConfirmation from './pages/DisposalConfirmation';
// import { addLocalOrganizations } from './pages/addLocalOrganizations';
// import { addVendors } from './pages/addVendors';

function App() {
  useEffect(() => {
    // Uncomment this line to add local organizations
    //  addLocalOrganizations();
    // addVendors();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload" element={<PrivateRoute><Classify /></PrivateRoute>} />
              <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
              <Route path="/donate" element={<PrivateRoute><Donate /></PrivateRoute>} />
              <Route path="/select-organization" element={<OrganizationSelect />} />
              <Route path="/donation-confirmation" element={<DonationConfirmation />} />
              <Route path="/dispose" element={<PrivateRoute><Dispose /></PrivateRoute>} />
              <Route path="/disposal-confirmation" element={<DisposalConfirmation />} />
              <Route path="/repair" element={<PrivateRoute><Repair /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;