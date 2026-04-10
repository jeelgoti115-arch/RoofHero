import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import { RiArrowLeftLine } from '@remixicon/react';
import ProposalDetails from '../components/ProposalDetails';
import ContractorInfo from '../components/ContractorInfo';
import Notifications from '../components/Notifications'; // Import Notifications
import '../Styles/OpenProjectDetails.css';
import { useNavigate } from 'react-router-dom';

const OpenProjectDetails = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // New State

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="open-project-container">
      <div className={`dashboard-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isOpen={isSidebarOpen} />
        
        <div className="dashboard-main-content">
          {/* Pass toggle and active state to Header */}
          <DashboardHeader 
            onToggleSidebar={toggleSidebar} 
            onToggleNotifications={toggleNotifications}
            isNotificationActive={showNotifications}
          />
          
          <div className="dashboard-body"> {/* Using dashboard-body class for spacing consistency */}
            
            {showNotifications ? (
              /* --- NOTIFICATIONS VIEW --- */
              <div className="animate-fade">
                <div className="section-header-row">
                  <h1 className="header-title">Notifications</h1>
                  
                </div>
                <Notifications onNavigateBids={() => navigate('/dashboard')} />
              </div>
            ) : (
              /* --- MAIN CONTENT VIEW --- */
              <div className="animate-fade">
                <div className="proposal-page-header">
                  <button className="back-circle-btn" onClick={handleBackToDashboard}>
                    <RiArrowLeftLine size={20} />
                  </button>
                  <h1 className="header-title">Proposal Details</h1>
                </div>
                <ProposalDetails />
                <ContractorInfo />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenProjectDetails;