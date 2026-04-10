import React, { useState } from 'react';
import '../Styles/Dashboard.css';
import ProjectDetails from '../components/ProjectDetails';
import AccountManager from '../components/AccountManager';
import BidCard from '../components/BidCard';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import Notifications from '../components/Notifications'; // Assuming this exists

const Dashboard = () => {
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
              <h1 className="page-title">Homeowner Dashboard</h1>

              {/* 3. Top Section */}
              <div className="dashboard-grid-top">
                <ProjectDetails />
                <AccountManager />
              </div>

              {/* 4. Bottom Section */}
              <div className="dashboard-bids-section">
                <div className="bids-grid">
                  <BidCard />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;