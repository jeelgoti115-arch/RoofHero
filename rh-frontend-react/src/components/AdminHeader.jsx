import React from 'react';
import { RiMenuLine, RiNotification3Line } from '@remixicon/react';

const AdminHeader = ({ onToggleSidebar, onToggleNotifications, isNotificationActive }) => {
  return (
    <header className="adm-hdr-container">
      <div className="adm-hdr-left">
        <button className="adm-hdr-menu-btn" onClick={onToggleSidebar}>
          <RiMenuLine size={24} />
        </button>
      </div>

      <div className="adm-hdr-right">
        {/* Notification Button with Dot */}
        <button 
          className={`adm-hdr-noti-btn ${isNotificationActive ? 'adm-hdr-active' : ''}`}
          onClick={onToggleNotifications}
        >
          <div className="adm-hdr-icon-circle">
            <img src='/dashboard-header-icon.png' alt='dashboard-header-icon' />
            <span className="adm-hdr-dot"></span>
          </div>
        </button>

        {/* Profile Avatar */}
        <div className="adm-hdr-profile">
          <img 
            src="/dashboard1-profile.png" 
            alt="Admin Profile" 
            className="adm-hdr-avatar" 
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;