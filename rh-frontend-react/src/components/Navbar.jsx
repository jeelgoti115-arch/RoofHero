import { RiArrowRightUpLine, RiArrowDownSLine } from '@remixicon/react';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // New state to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('roofheroToken');
    const user = localStorage.getItem('roofheroUser');
    setIsLoggedIn(Boolean(token && user));
  }, []);

  // Handle CTA button logic
  const handleButtonClick = () => {
    const token = localStorage.getItem('roofheroToken');
    const user = localStorage.getItem('roofheroUser');
  
    if (token && user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src="public/Frame 1000009354.png" alt="roofhero.au" />
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
          <a href="#book-call" onClick={() => setIsMobileMenuOpen(false)}>Book a Call</a>
          <a href="#blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
          
          <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Contact <RiArrowDownSLine size={20} />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="#contact1">Contact 1</a>
                <a href="#contact2">Login</a>
                <a href="#contact3">Admin Login</a>
                <a href="#contact3">Contractor Login</a>
              </div>
            )}
          </div>
        </div>

        <div className="nav-actions">
          {/* Dynamic Button Text and Action */}
          <button className="cta-btn-navbar" onClick={handleButtonClick}>
            {isLoggedIn ? 'Go to My Dashboard' : 'Get Your Instant Quote'} 
            <RiArrowRightUpLine size={20} />
          </button>

          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;