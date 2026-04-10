import React from 'react';
import { RiArrowRightUpLine } from '@remixicon/react';

const Notifications = () => {
  const notificationData = [
    {
      id: 1,
      text: "Your quote for 123 Bondi Rd is now available. Please review to explore contractor bids.",
      date: "10 May, 2025",
      btnText: "View Bids",
    },
    {
      id: 2,
      text: "Your quote for 123 Bondi Rd is now available. Please review to explore contractor bids.",
      date: "10 May, 2025",
      btnText: "View Bids",
    },
    {
      id: 3,
      text: "We've updated the roof images for your request at 45 Beach St, Coogee. These help contractors provide more accurate quotes.",
      date: "10 May, 2025",
      btnText: "View Updated Photos",
    },
    {
      id: 4,
      text: "A new document has been added to your roof job request for 12 Hillside Ave. This may include access info or inspection notes.",
      date: "10 May, 2025",
      btnText: "View Documents",
    },
    {
      id: 5,
      text: "Your quote for 123 Bondi Rd is now available. Please review to explore contractor bids.",
      date: "10 May, 2025",
      btnText: "View Bids",
    },
    {
      id: 6,
      text: "We've made changes to your roof request for 22 Ocean View Rd. These updates will help contractors prepare more accurate bids",
      date: "10 May, 2025",
      btnText: "See Updated Info",
    }
  ];

  return (
    <div className="notifications-container">
      {notificationData.map((item) => (
        <div key={item.id} className="notification-card">
          <div className="noti-left-content">
            <div className="noti-icon-circle">
              {/* Replace with your specific logo/icon */}
              <img src="public/notification-img.svg" alt="icon" />
            </div>
            <div className="noti-text-details">
              <p className="noti-message">{item.text}</p>
              <span className="noti-date">{item.date}</span>
            </div>
          </div>
          
          <button className="noti-action-btn">
            {item.btnText} <RiArrowRightUpLine size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;