import React, { useEffect, useRef, useState } from 'react';
import { RiArrowRightUpLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const BidCard = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractors, setContractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeownerBids = async () => {
      const token = window.localStorage.getItem('roofheroToken');
      if (!token) {
        setError('Authentication required.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/homeowner/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data?.message || 'Unable to load contractor bids.');
        }

        const data = await response.json();
        const assignedContractors = data.quote?.assignedContractors || [];

        setContractors(
          assignedContractors.map((contractor, index) => ({
            id: contractor.id || `contractor-${index}`,
            name: contractor.name || contractor.username || `Contractor ${index + 1}`,
            image: contractor.image || 'public/contractor1.jpg',
            price: contractor.quoteAmount || contractor.pricePerSquare || 'N/A',
            rating: contractor.rating || '4.7',
            contractorId: contractor.username
              ? `#${contractor.username.toUpperCase()}`
              : contractor.id
              ? `#RPH-${contractor.id.toString().slice(-6).toUpperCase()}`
              : `#RPH-2025-00${index + 1}`,
            pricePerSq: contractor.pricePerSquare || 'N/A',
            status: contractor.status || 'New Arrival',
            isRejected: contractor.status === 'Rejected',
          }))
        );
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeownerBids();
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(false);
    navigate('/project-details');
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.querySelector('.bid-card-item');
      if (!cardElement) return;
      const cardWidth = cardElement.offsetWidth + 20;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const hasContractors = contractors.length > 0;

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
        {isLoading ? (
          <div className="bid-card-empty">
            <p>Loading contractor bids...</p>
          </div>
        ) : error ? (
          <div className="bid-card-empty">
            <p>{error}</p>
          </div>
        ) : !hasContractors ? (
          <div className="bid-card-empty">
            <p>No contractor bids are available yet. Please check back once contractors submit proposals.</p>
          </div>
        ) : (
          contractors.map((item) => (
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
                    onClick={() => setIsModalOpen(true)}
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
          ))
        )}
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