import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiArrowRightUpLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const BidCard = ({ quote, onQuoteUpdated }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [contractors, setContractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);
  const [acceptError, setAcceptError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const normalizeImagePath = useCallback((value) => {
    if (!value) return '/contractor1.jpg';
    if (/^(https?:|data:)/.test(value)) return value;
    return `/${value.replace(/^\/+/, '').replace(/^public\//, '')}`;
  }, []);

  const mapContractors = useCallback(
    (assignedContractors = []) =>
      assignedContractors.map((contractor, index) => ({
        id: contractor.id || contractor._id || `contractor-${index}`,
        name: contractor.name || contractor.username || `Contractor ${index + 1}`,
        image: normalizeImagePath(contractor.avatarUrl || contractor.image || 'contractor1.jpg'),
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
        proposalMessage: contractor.proposalMessage || '',
        estimatedStartDate: contractor.estimatedStartDate || '',
        quoteAmount: contractor.quoteAmount || '',
      })),
    [normalizeImagePath]
  );

  useEffect(() => {
    if (quote) {
      setContractors(mapContractors(quote.assignedContractors));
      setIsLoading(false);
      return;
    }

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
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.message || 'Unable to load contractor bids.');
        }

        const data = await response.json();
        setContractors(mapContractors(data.quote?.assignedContractors || []));
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeownerBids();
  }, [quote, mapContractors]);

  const handleAcceptQuote = async (contractor) => {
    if (!quote?.id) {
      setAcceptError('Unable to accept this bid.');
      return;
    }

    setAcceptError(null);
    setSuccessMessage(null);
    setAcceptingId(contractor.id);

    try {
      const token = window.localStorage.getItem('roofheroToken');
      if (!token) {
        throw new Error('Authentication required.');
      }

      const response = await fetch(`/api/homeowner/quote-requests/${quote.id}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contractorId: contractor.id }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || 'Failed to accept bid.');
      }

      const data = await response.json();
      const updatedQuote = data.quote;
      setContractors(mapContractors(updatedQuote.assignedContractors || []));
      setSuccessMessage('Bid accepted successfully.');
      onQuoteUpdated?.();
    } catch (fetchError) {
      setAcceptError(fetchError.message);
    } finally {
      setAcceptingId(null);
    }
  };

  const handleButtonClick = () => {
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

      {successMessage && <div className="bid-card-success">{successMessage}</div>}
      {acceptError && <div className="bid-card-error">{acceptError}</div>}

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
                <div className="card-price">{item.price}</div>
              </div>

              <div className="service-tag">
                {item.status === 'Pending Review' ? 'Bid Submitted' : item.status === 'Accepted' ? 'Bid Accepted' : item.status === 'Rejected' ? 'Bid Rejected' : 'Awaiting Bid'}
              </div>
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
                {item.status === 'Pending Review' ? (
                  <button
                    className="btn-orange"
                    onClick={() => handleAcceptQuote(item)}
                    disabled={acceptingId === item.id}
                  >
                    {acceptingId === item.id ? 'Accepting...' : 'Accept Quote'} <RiArrowRightUpLine size={16} />
                  </button>
                ) : item.status === 'Accepted' ? (
                  <div className="rejected-label">
                    <span className="info-circle">✓</span>
                    Accepted bid
                  </div>
                ) : item.status === 'Rejected' ? (
                  <div className="rejected-label">
                    <span className="info-circle">i</span>
                    Contractor has been rejected.
                  </div>
                ) : (
                  <div className="rejected-label">
                    <span className="info-circle">⏳</span>
                    Awaiting bid.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BidCard;