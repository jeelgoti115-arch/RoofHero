// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import HomeOwner from './pages/HomeOwner';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import OpenProjectDetails from './pages/OpenProjectDetails';
import ScrollToTop from './components/ScrollToTop';
import AdminDash from './pages/AdminDash';
import ContractorDash from './pages/ContractorDash';
import ContractorRegister from './pages/ContractorRegister';
import RequireAuth from './components/RequireAuth';

const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homeowner" element={<HomeOwner />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/project-details"
          element={
            <RequireAuth>
              <OpenProjectDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminDash />
            </RequireAuth>
          }
        />
        <Route
          path="/contractor"
          element={
            <RequireAuth>
              <ContractorDash />
            </RequireAuth>
          }
        />
        <Route path="/contractor-signup" element={<ContractorRegister />} />
      </Routes>
    </Router>
  );
};

export default App;