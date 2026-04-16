import React, { useState } from 'react';
import { 
  RiLogoutBoxRLine 
} from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false); // State for Logout Popup
  

  const handleLogout = () => {
    setShowToast(true);
    localStorage.removeItem('roofheroToken');
    localStorage.removeItem('roofheroUser');
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { state: { logoutSuccess: true } });
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', img: '/dashbord_ic.svg' },
    { id: 'contractor', label: 'Contractor Management', img: '/contractor_ic.svg' },
    { id: 'homeowner', label: 'Homeowner Management', img: '/profile_ic.svg' },
    { id: 'jobs', label: 'Job & Bidding Pipeline', img: '/work_update_ic.svg' },
    { id: 'pricing', label: 'Pricing Logic Management', img: '/rate_ic.svg' },
  ];

  return (
    <>
    {/* --- LOGOUT TOAST POPUP --- */}
      {showToast && (
        <div className="login-toast-popup animate-slide-in">
          <RiCheckboxCircleFill size={20} color="#2ecc71" />
          <span>Log out successfull!</span>
        </div>
      )}
    <aside className={`adm-sb-container ${isOpen ? 'closed' : 'open'}`}>
      <div className="adm-sb-logo-section">
        <img src="/Frame 1000009354.png" alt="roofhero.au" />
      </div>

      <div className="adm-sb-menu-list">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className={`adm-sb-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)} 
          >
            
            <span className="adm-sb-icon-wrapper"><img src={item.img} alt='icon'></img></span>
            <span className="adm-sb-label-text">{item.label}</span>
          </div>
        ))}
        <button className="adm-sb-logout-action" onClick={handleLogout}>
          <RiLogoutBoxRLine size={20} />
          <span className="adm-sb-logout-text">Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default AdminSidebar;