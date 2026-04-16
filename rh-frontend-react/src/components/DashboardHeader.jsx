import React from 'react';
import { RiMenuLine } from '@remixicon/react';

const DashboardHeader = ({ onToggleSidebar, onToggleNotifications, isNotificationActive }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <RiMenuLine size={24} />
        </button>
      </div>
      
      <div className="header-right">
        {/* Added onClick and a dynamic class for active state */}
        <button 
          className={`notification-badge ${isNotificationActive ? 'active' : ''}`} 
          onClick={onToggleNotifications}
        >
          <img src='/dashboard-header-icon.png' alt='dashboard-header-icon' />
          <span className="dot"></span>
        </button>
        <img src="/dashboard1-profile.png" alt="Profile" className="header-avatar" />
      </div>
    </header>
  );
};

export default DashboardHeader;