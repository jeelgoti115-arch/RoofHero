import React, { useState, useEffect } from 'react';
import DashContractor from '../components/DashContractor';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import Notifications from '../components/Notifications';
import socket from '../socket';
import '../Styles/ContractorDash.css'

const ContractorDash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const fetchNotifications = async () => {
    const token = window.localStorage.getItem('roofheroToken');
    if (!token) {
      setNotifications([]);
      return;
    }

    try {
      const response = await fetch('/api/contractors/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setNotifications([]);
        return;
      }

      const data = await response.json();
      setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
    } catch (error) {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleNotificationUpdate = () => {
      fetchNotifications();
    };

    socket.on('contractorDashboardUpdated', handleNotificationUpdate);
    socket.on('contractorQuoteAssigned', handleNotificationUpdate);

    return () => {
      socket.off('contractorDashboardUpdated', handleNotificationUpdate);
      socket.off('contractorQuoteAssigned', handleNotificationUpdate);
    };
  }, []);

  return (
    <div className={`dashboard-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} />

      <div className="dashboard-main-content">
        <DashboardHeader 
          onToggleSidebar={toggleSidebar} 
          onToggleNotifications={toggleNotifications} 
          isNotificationActive={showNotifications}
        />

        <main className="dashboard-body">
          {showNotifications ? (
            <div className="animate-fade">
              <div className="section-header-row">
                <h1 className="page-title">Notifications</h1>
              </div>
              <Notifications notifications={notifications} />
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
