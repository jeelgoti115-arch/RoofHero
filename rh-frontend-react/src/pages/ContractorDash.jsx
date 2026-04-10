import React, { useState } from 'react';
import DashContractor from '../components/DashContractor';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import Notifications from '../components/Notifications';
import '../Styles/ContractorDash.css'

const ContractorDash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
    };

  return (
    <div className={`dashboard-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      
      {/* 1. Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className="dashboard-main-content">
        {/* 2. Top Header - Pass the toggle function here */}
        <DashboardHeader 
          onToggleSidebar={toggleSidebar} 
          onToggleNotifications={toggleNotifications} 
          isNotificationActive={showNotifications}
        />

        <main className="dashboard-body">
          {/* Conditional Rendering Logic */}
          {showNotifications ? (
            <div className="animate-fade">
              <div className="section-header-row">
                <h1 className="page-title">Notifications</h1>
              </div>
              <Notifications />
            </div>
          ) : (
            <div className="animate-fade">
              <DashContractor />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ContractorDash
