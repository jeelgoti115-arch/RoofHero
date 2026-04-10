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

const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homeowner" element={<HomeOwner />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project-details" element={<OpenProjectDetails />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/contractor" element={<ContractorDash />} />
        <Route path="/contractor-signup" element={<ContractorRegister />} />
      </Routes>
    </Router>
  );
};

export default App;