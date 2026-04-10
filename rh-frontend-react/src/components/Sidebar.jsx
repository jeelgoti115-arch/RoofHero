import React from 'react';
import { RiLogoutBoxRLine, RiCheckboxCircleFill } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('roofheroToken');
    localStorage.removeItem('roofheroUser');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <>
      <aside className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-logo">
          <img src="/Frame 1000009354.png" alt="roofhero.au" />
        </div>
        
        <div className="sidebar-menu">
          <div className="nav-item active">
            <img src='/dashbord_ic.png' alt='dashbord_ic' />
            <span>Dashboard</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <RiLogoutBoxRLine size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;