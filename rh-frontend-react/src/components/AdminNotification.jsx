import React from 'react';
import { RiArrowRightUpLine } from '@remixicon/react';
import '../Styles/Admin.css'; // Ensure this points to your CSS file

const AdminNotification = () => {
  const notifications = [
    {
      id: 1,
      text: 'A new roof request has been submitted for 14 Ocean View Rd. Review and assign to contractors.',
      date: '10 May, 2025',
      btnText: 'View Request',
    },
    {
      id: 2,
      text: 'Mike Roofing Co. has submitted an onboarding request. Review their documents and approve if eligible.',
      date: '10 May, 2025',
      btnText: 'Review Contractor',
    },
    {
      id: 3,
      text: 'A new bid has been submitted for 55 Glenmore St. Homeowner can now view and respond.',
      date: '10 May, 2025',
      btnText: 'View Bids',
    },
    {
      id: 4,
      text: 'The homeowner rejected all bids for 88 Hillcrest Ave. Consider re-assigning to more contractors.',
      date: '10 May, 2025',
      btnText: 'Reassign Contractors',
    },
    {
      id: 5,
      text: 'homeowner has selected ClearSky Roofing for the job at 25 Ridge Rd.',
      date: '10 May, 2025',
      btnText: 'View Job',
    },
    {
      id: 6,
      text: 'homeowner has selected ClearSky Roofing for the job at 25 Ridge Rd.',
      date: '10 May, 2025',
      btnText: 'View Job',
    },
  ];

  return (
    <div className="adm-noti-container animate-fade">
        <div className="section-header-row">
        <h1 className="page-title">Notifications</h1>
        </div>
            {notifications.map((noti) => (
                <div key={noti.id} className="adm-noti-card">
                <div className="adm-noti-left">
                    <div className="adm-noti-icon-circle">
                    {/* This matches the RoofHero logo mark in the dark circle */}
                    <img src="/notification-img.svg" alt="icon" className="adm-noti-logo-mark" />
                    </div>
                    <div className="adm-noti-content">
                    <p className="adm-noti-text">{noti.text}</p>
                    <span className="adm-noti-date">{noti.date}</span>
                    </div>
                </div>
                
                <div className="adm-noti-right">
                    <button className="adm-noti-btn">
                    {noti.btnText} <RiArrowRightUpLine size={18} />
                    </button>
                </div>
                </div>
            ))}
        </div>
    );
};

export default AdminNotification;