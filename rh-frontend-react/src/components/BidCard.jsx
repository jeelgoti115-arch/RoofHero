import React, { useRef, useState } from 'react';
import { RiArrowRightUpLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const BidCard = () => {
  const navigate = useNavigate(); // Initialize navigation
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const handleButtonClick = () => {
    setIsModalOpen(false); // Close the modal first
    navigate('/project-details'); // Navigate to the route path
  };

  const contractors = [
    { id: 1, name: "Matthew Plunkett", image: "public/contractor1.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143", isRejected: false },
    { id: 2, name: "Madeline Joyner", image: "public/contractor2.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143", isRejected: true },
    { id: 3, name: "Matthew Plunkett", image: "public/contractor1.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143", isRejected: false },
    { id: 4, name: "Sarah Walker", image: "public/contractor2.jpg", price: "8,500", rating: "4.9", contractorId: "#RPH-2025-00124", pricePerSq: "130", isRejected: true },
    { id: 5, name: "Kane Williamson", image: "public/contractor1.jpg", price: "9,800", rating: "4.5", contractorId: "#RPH-2025-00125", pricePerSq: "155", isRejected: false },
    { id: 6, name: "Novak Djokovic", image: "public/contractor2.jpg", price: "9,300", rating: "5.0", contractorId: "#RPH-2025-00123", pricePerSq: "144", isRejected: false },
    { id: 7, name: "Rafael Nadal", image: "public/contractor1.jpg", price: "8,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "147", isRejected: false },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('.bid-card-item').offsetWidth + 20;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="contractor-bids-section">
      <div className="bids-header">
        <h2 className="section-title">Contractor Bids</h2>
        <div className="carousel-nav">
          <button className="nav-arrow" onClick={() => scroll('left')}><RiArrowLeftSLine size={20} /></button>
          <button className="nav-arrow" onClick={() => scroll('right')}><RiArrowRightSLine size={20} /></button>
        </div>
      </div>

      <div className="bids-slider-track" ref={scrollRef}>
        {contractors.map((item) => (
          <div key={item.id} className={`bid-card-item ${item.isRejected ? 'rejected' : ''}`}>
            <div className="card-top-row">
              <div className="user-profile">
                <img src={item.image} alt="avatar" />
                <div className="user-text">
                  <h4>{item.name}</h4>
                  <div className="rating-row">
                    <img src="public/star-ic-rating.png" alt="star" className='star'/>
                    <span className="rating-label">{item.rating} (128 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="card-price">${item.price}</div>
            </div>

            <div className="service-tag">Roof Replacement</div>
            <hr className="divider" />

            <div className="card-details-grid">
              <div className="col">
                <label>CONTRACTOR ID:</label>
                <span>{item.contractorId}</span>
              </div>
              <div className="col">
                <label>PRICE PER SQUARE:</label>
                <span>${item.pricePerSq}</span>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn-white" onClick={handleButtonClick}>View Details <RiArrowRightUpLine size={16} /></button>
              {!item.isRejected ? (
                <button 
                  className="btn-orange" 
                  onClick={() => setIsModalOpen(true)} // Open Modal
                >
                  Accept Quote <RiArrowRightUpLine size={16} />
                </button>
              ) : (
                <div className="rejected-label">
                  <span className="info-circle">i</span>
                  Contractor has been rejected.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- SUCCESS MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon-container">
               <img src="public/bidcard-qa.svg" alt="Success" />
            </div>
            <h2>Quote Accepted Successfully</h2>
            <p>
              Your roofing project has been confirmed. The selected contractor 
              will contact you soon to coordinate the next steps and schedule the site visit.
            </p>
            <button className="modal-btn" onClick={handleButtonClick}>
              View Project <RiArrowRightUpLine size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BidCard;