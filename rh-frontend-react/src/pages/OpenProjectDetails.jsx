import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import { RiArrowLeftLine } from '@remixicon/react';
import ProposalDetails from '../components/ProposalDetails';
import ContractorInfo from '../components/ContractorInfo';
import Notifications from '../components/Notifications'; // Import Notifications
import '../Styles/OpenProjectDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';

const OpenProjectDetails = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // New State
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const locationJob = location.state?.job || null;
  const locationContractor = location.state?.contractor || null;  const backPath = location.state?.from || '/dashboard';
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const loadData = async () => {
      if (locationJob) {
        setSelectedJob(locationJob);
        setSelectedContractor(locationContractor || (locationJob.assignedContractors?.[0] || locationJob.assignedContractor || null));
        setError('');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('roofheroToken');
        if (!token) {
          setError('No selected bid data found. Please open this page from your bids list.');
          return;
        }

        const response = await fetch('/api/homeowner/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Unable to load bid details.');
        }
        const data = await response.json();
        const fallbackJob = data.quote || null;
        if (!fallbackJob) {
          setError('No bid details were found for this account.');
          return;
        }
        setSelectedJob(fallbackJob);
        setSelectedContractor(fallbackJob.assignedContractors?.[0] || fallbackJob.assignedContractor || null);
      } catch (err) {
        setError(err?.message || 'Error loading bid details.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [locationJob, locationContractor]);

  const handleBackToDashboard = () => {
    navigate(backPath);
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
                {loading ? (
                  <div className="detail-loading">
                    <p>Loading project details…</p>
                  </div>
                ) : error ? (
                  <div className="detail-error">
                    <p>{error}</p>
                    <button className="btn-orange" onClick={handleBackToDashboard}>Back to Dashboard</button>
                  </div>
                ) : (
                  <>
                    <ProposalDetails job={selectedJob} contractor={selectedContractor} />
                    <ContractorInfo contractor={selectedContractor} project={selectedJob} />
                  </>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenProjectDetails;