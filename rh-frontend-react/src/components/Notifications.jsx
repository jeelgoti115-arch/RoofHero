import React from 'react';
import { RiArrowRightUpLine } from '@remixicon/react';

const fallbackNotifications = [
  {
    id: 1,
    subject: 'New roof job available',
    text: 'You’ve been invited to bid on a new job at the property. Submit your bid before the deadline.',
    date: '10 May, 2025',
    buttonText: 'View Job Details',
    buttonUrl: '/project-details',
  },
  {
    id: 2,
    subject: 'Your bid was accepted!',
    text: 'Your bid for the property has been accepted by the homeowner. Coordinate next steps directly.',
    date: '10 May, 2025',
    buttonText: 'View Job Details',
    buttonUrl: '/project-details',
  },
  {
    id: 3,
    subject: 'Your bid was not selected',
    text: 'Your bid for the property was not selected. Better luck on the next opportunity.',
    date: '10 May, 2025',
    buttonText: null,
    buttonUrl: null,
  },
];

const Notifications = ({ notifications }) => {
  const notificationData = notifications !== undefined ? notifications : fallbackNotifications;

  return (
    <div className="notifications-container">
      {notificationData.length ? (
        notificationData.map((item) => (
          <div key={item.id} className="notification-card">
            <div className="noti-left-content">
              <div className="noti-icon-circle">
                {/* Replace with your specific logo/icon */}
                <img src="/notification-img.svg" alt="icon" />
              </div>
              <div className="noti-text-details">
                <p className="noti-message">
                  <strong>{item.subject}</strong> {item.text}
                </p>
                <span className="noti-date">{item.date}</span>
              </div>
            </div>

            {item.buttonText ? (
              <a href={item.buttonUrl || '#'} className="noti-action-btn">
                {item.buttonText} <RiArrowRightUpLine size={18} />
              </a>
            ) : (
              <button className="noti-action-btn no-cta" disabled>
                No action
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="notification-card">
          <div className="noti-left-content">
            <div className="noti-icon-circle">
              <img src="/notification-img.svg" alt="icon" />
            </div>
            <div className="noti-text-details">
              <p className="noti-message">You have no new notifications at the moment.</p>
              <span className="noti-date">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;