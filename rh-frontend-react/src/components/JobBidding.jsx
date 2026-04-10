/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiArrowLeftLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseCircleLine,
  RiAddCircleFill,
  RiMailFill,
  RiPhoneFill,
} from '@remixicon/react';

const AwaitingAssignmentView = ({ job, onBack }) => {

  const [expandedSection, setExpandedSection] = useState('basic');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="jb-details-container animate-fade">
      {/* Header with Back Button */}
      <div className="jb-details-header">
        <button onClick={onBack} className="jb-back-btn">
          <RiArrowLeftLine size={20} />
        </button>
        <h1>Homeowner Project Details</h1>
      </div>

      <div className="jb-details-layout">
        {/* Left Section: Project Details */}
        <div className="jb-details-main">
          <div className="jb-card jb-p-24">
            <h2 className="jb-section-title">Project Details</h2>
            
            <div className="jb-profile-row">
              <img src="public/contractor2.jpg" alt="Profile" className="jb-avatar" />
              <div className="jb-profile-info">
                <h3>{job.name}</h3>
                <div className="jb-contact-row">
                  <span><RiMailFill size={14} className="jb-icon-orange" /> JasperCanning@dayrep.com</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={14} className="jb-icon-orange" /> 937-304-8161</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="jb-status-tag jb-tag-open">
                   <span className="jb-dot"></span> No Bids
                </div>
                <p className="jb-bids-count">Waiting for Assignment</p>
              </div>
            </div>

            <h2 className="jb-section-title mt-24">Project Images</h2>
            <div className="jb-image-grid-4">
              <img src="public/r1.jpg" alt="Job" />
              <img src="public/r2.jpg" alt="Job" />
              <img src="public/r3.jpg" alt="Job" />
              <div className="jb-image-card-more">
                <img src="public/r4.jpg" alt="Job" />
                <div className="jb-image-overlay">
                  <span>View More</span>
                  <RiAddCircleFill size={16} />
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="jb-accordion mt-24">
              
              {/* Basic Information Section */}
              <div className={`jb-accordion-item ${expandedSection === 'basic' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'basic' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('basic')}
                >
                  <span>Basic Information</span>
                  <div className={`jb-circle-icon ${expandedSection === 'basic' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'basic' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'basic' && (
                  <div className="jb-accordion-content jb-grid-2 animate-fade">
                    <div><label>Project ID:</label><p>RH-JOB-2025-0148</p></div>
                    <div><label>Property Address:</label><p>27 Rosebay Street, Bondi, NSW 2026</p></div>
                    <div><label>Roof Type:</label><p>Tile Roof</p></div>
                    <div><label>Approx. Roof Area:</label><p>180 m²</p></div>
                    <div><label>Pitch Type:</label><p>Medium Pitch (25-35°)</p></div>
                    <div><label>Stories:</label><p>2</p></div>
                    <div><label>Access Difficulty:</label><p>Moderate</p></div>
                    <div><label>Material Requested:</label><p>Colorbond Metal</p></div>
                    <div className="jb-col-span-2"><label>Urgency Level:</label><p>Flexible (within 30 days)</p></div>
                  </div>
                )}
              </div>

              {/* Automated Quoting Section */}
              <div className={`jb-accordion-item mt-12 ${expandedSection === 'quoting' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'quoting' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('quoting')}
                >
                  <span>Automated Quoting</span>
                  <div className={`jb-circle-icon ${expandedSection === 'quoting' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'quoting' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'quoting' && (
                  <div className="jb-accordion-content jb-grid-2 animate-fade">
                    <div><label>Automated Quoting:</label><p>$8,000 — $9,500 AUD</p></div>
                    <div><label>Provide by:</label><p>roofhero</p></div>
                  </div>
                )}
              </div>

              {/* Documents Section */}
              <div className={`jb-accordion-item mt-12 ${expandedSection === 'docs' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'docs' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('docs')}
                >
                  <span>Documents</span>
                  <div className={`jb-circle-icon ${expandedSection === 'docs' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'docs' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'docs' && (
                  <div className="jb-accordion-content jb-doc-flex animate-fade">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="jb-doc-pill-card">
                        <div className="jb-doc-icon-box">
                          <img src="public/pdf_ic.png" alt="pdf" width="20" />
                        </div>
                        <div className="jb-doc-text">
                          <span className="jb-doc-name">RooferCoinsurance.pdf</span>
                          <span className="jb-doc-sub">Public Liability Insurance</span>
                        </div>
                        <RiCloseCircleLine size={18} className="jb-doc-close" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Contractor Assignment */}
        <div className="jb-details-side">
          <div className="jb-card jb-p-24">
            <h2 className="jb-section-title">Contractor Assignment</h2>
            <div className="jb-search-box-side">
              <input type="text" placeholder="Search Contractor" />
            </div>
            <div className="jb-contractor-list">
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/toby.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Toby Adamson</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/angus.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Angus Klein</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/beau.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Beau Gledson</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/riley.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Riley Blanc</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/zane.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Zane Vlamingh</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/aidan.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Aidan Heymann</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
                <div className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src='public/archer.jpg' className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">Archer McCorkindale</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    <input type="checkbox" className="jb-checkbox" />
                  </div>
                </div>
            </div>
            <button className="jb-btn-assign-main mt-24">
              Assign Selected Contractor <RiArrowRightUpLine size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BiddingInProgressView = ({ onBack }) => {
  const [expandedSection, setExpandedSection] = useState('basic');
  const navigate = useNavigate(); // Initialize navigation
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleButtonClick = () => {
    setIsModalOpen(false); // Close the modal first
    navigate('/project-details'); // Navigate to the route path
  };

  const contractors = [
    { id: 1, name: "Matthew Plunkett", image: "public/contractor1.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143", isRejected: false },
    { id: 2, name: "Madeline Joyner", image: "public/contractor2.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143", isRejected: true },
    { id: 3, name: "Matthew Plunkett", image: "public/contractor1.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143", isRejected: false },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('.bid-card-item').offsetWidth + 20;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="jb-details-container animate-fade">
      {/* Header */}
      <div className="jb-details-header">
        <button onClick={onBack} className="jb-back-btn">
          <RiArrowLeftLine size={20} />
        </button>
        <h1>Homeowner Project Details</h1>
      </div>

      <div className="jb-details-layout">
        {/* LEFT MAIN CONTENT */}
        <div className="jb-details-main">
          <div className="jb-card jb-p-24">
            <h2 className="jb-section-title">Project Details</h2>
            <div className="jb-profile-row">
              <img src="public/contractor2.jpg" alt="Profile" className="jb-avatar" />
              <div className="jb-profile-info">
                <h3>Samantha Hollick</h3>
                <div className="jb-contact-row">
                  <span><RiMailFill size={14} className="jb-icon-orange" /> JasperCanning@dayrep.com</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={14} className="jb-icon-orange" /> 937-304-8161</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="jb-status-tag jb-tag-open-green">
                  <span className="jb-dot-green"></span> Open For Bids
                </div>
                <p className="jb-bids-count">12 Contractor Bids Received</p>
              </div>
            </div>

            <h2 className="jb-section-title mt-24">Project Images</h2>
            <div className="jb-image-grid-4">
              <img src="public/r1.jpg" alt="Job" />
              <img src="public/r2.jpg" alt="Job" />
              <img src="public/r3.jpg" alt="Job" />
              <div className="jb-image-card-more">
                <img src="public/r4.jpg" alt="Job" />
                <div className="jb-image-overlay">
                  <span>View More</span>
                  <RiArrowRightUpLine size={16} />
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="jb-accordion mt-24">
              
              {/* Basic Information Section */}
              <div className={`jb-accordion-item ${expandedSection === 'basic' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'basic' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('basic')}
                >
                  <span>Basic Information</span>
                  <div className={`jb-circle-icon ${expandedSection === 'basic' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'basic' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'basic' && (
                  <div className="jb-accordion-content jb-grid-2 animate-fade">
                    <div><label>Project ID:</label><p>RH-JOB-2025-0148</p></div>
                    <div><label>Property Address:</label><p>27 Rosebay Street, Bondi, NSW 2026</p></div>
                    <div><label>Roof Type:</label><p>Tile Roof</p></div>
                    <div><label>Approx. Roof Area:</label><p>180 m²</p></div>
                    <div><label>Pitch Type:</label><p>Medium Pitch (25-35°)</p></div>
                    <div><label>Stories:</label><p>2</p></div>
                    <div><label>Access Difficulty:</label><p>Moderate</p></div>
                    <div><label>Material Requested:</label><p>Colorbond Metal</p></div>
                    <div className="jb-col-span-2"><label>Urgency Level:</label><p>Flexible (within 30 days)</p></div>
                  </div>
                )}
              </div>

              {/* Automated Quoting Section */}
              <div className={`jb-accordion-item mt-12 ${expandedSection === 'quoting' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'quoting' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('quoting')}
                >
                  <span>Automated Quoting</span>
                  <div className={`jb-circle-icon ${expandedSection === 'quoting' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'quoting' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'quoting' && (
                  <div className="jb-accordion-content jb-grid-2 animate-fade">
                    <div><label>Automated Quoting:</label><p>$8,000 — $9,500 AUD</p></div>
                    <div><label>Provide by:</label><p>roofhero</p></div>
                  </div>
                )}
              </div>

              {/* Documents Section */}
              <div className={`jb-accordion-item mt-12 ${expandedSection === 'docs' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'docs' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('docs')}
                >
                  <span>Documents</span>
                  <div className={`jb-circle-icon ${expandedSection === 'docs' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'docs' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'docs' && (
                  <div className="jb-accordion-content jb-doc-flex animate-fade">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="jb-doc-pill-card">
                        <div className="jb-doc-icon-box">
                          <img src="public/pdf_ic.png" alt="pdf" width="20" />
                        </div>
                        <div className="jb-doc-text">
                          <span className="jb-doc-name">RooferCoinsurance.pdf</span>
                          <span className="jb-doc-sub">Public Liability Insurance</span>
                        </div>
                        <RiCloseCircleLine size={18} className="jb-doc-close" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="jb-details-side">
          <div className="jb-card jb-p-24">
            <h2 className="jb-section-title">Contractor Assignment</h2>
            <div className="jb-search-box-side">
              <input type="text" placeholder="Search Contractor" />
            </div>
            <div className="jb-contractor-list">
              {[
                { name: 'Toby Adamson', status: 'Assigned', img: 'public/toby.jpg' },
                { name: 'Angus Klein', status: 'Assigned', img: 'public/angus.jpg' },
                { name: 'Beau Gledson', status: 'Assigned', img: 'public/beau.jpg' },
                { name: 'Riley Blanc', status: 'check', img: 'public/riley.jpg' },
                { name: 'Zane Vlamingh', status: 'check', img: 'public/zane.jpg' },
                { name: 'Aidan Heymann', status: 'check', img: 'public/aidan.jpg' },
                { name: 'Archer McCorkindale', status: 'check', img: 'public/archer.jpg' }
              ].map((c, i) => (
                <div key={i} className="jb-contractor-item">
                  <div className="jb-flex-row">
                    <img src={c.img} className="jb-avatar-sm" alt="C" />
                    <div className="jb-c-info">
                      <p className="jb-c-name">{c.name}</p>
                      <p className="jb-c-loc">Parramatta, Blacktown</p>
                    </div>
                    {c.status === 'Assigned' ? (
                      <span className="jb-assigned-text">Assigned</span>
                    ) : (
                      <input type="checkbox" className="jb-checkbox" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="jb-btn-assign-ghost mt-24">
              Contractor Assigned <RiArrowRightUpLine size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: CONTRACTOR BIDS */}
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
    </div>
  );
};

const BidAcceptedView = ({ onBack }) => {
  const [expandedSection, setExpandedSection] = useState('basic');
  const scrollRef = useRef(null);

  const contractors = [
    { id: 1, name: "Matthew Plunkett", image: "public/contractor1.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143" },
    { id: 2, name: "Madeline Joyner", image: "public/contractor2.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143" },
    { id: 3, name: "Matthew Plunkett", image: "public/contractor1.jpg", price: "9,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "143" },
    { id: 4, name: "Sarah Walker", image: "public/contractor2.jpg", price: "8,500", rating: "4.9", contractorId: "#RPH-2025-00124", pricePerSq: "130" },
    { id: 5, name: "Kane Williamson", image: "public/contractor1.jpg", price: "9,800", rating: "4.5", contractorId: "#RPH-2025-00125", pricePerSq: "155" },
    { id: 6, name: "Novak Djokovic", image: "public/contractor2.jpg", price: "9,300", rating: "5.0", contractorId: "#RPH-2025-00123", pricePerSq: "144" },
    { id: 7, name: "Rafael Nadal", image: "public/contractor1.jpg", price: "8,200", rating: "4.7", contractorId: "#RPH-2025-00123", pricePerSq: "147" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('.bid-card-item').offsetWidth + 20;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="jb-details-container animate-fade">
      {/* Header */}
      <div className="jb-details-header">
        <button onClick={onBack} className="jb-back-btn">
          <RiArrowLeftLine size={20} />
        </button>
        <h1>Homeowner Project Details</h1>
      </div>

      <div className="jb-details-layout">
        {/* LEFT MAIN CONTENT */}
        <div className="jb-details-main">
          <div className="jb-card jb-p-24">
            <h2 className="jb-section-title">Project Details</h2>
            <div className="jb-profile-row">
              <img src="public/contractor2.jpg" alt="Profile" className="jb-avatar" />
              <div className="jb-profile-info">
                <h3>Samantha Hollick</h3>
                <div className="jb-contact-row">
                  <span><RiMailFill size={14} className="jb-icon-orange" /> JasperCanning@dayrep.com</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={14} className="jb-icon-orange" /> 937-304-8161</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="jb-status-tag jb-tag-open-green">
                  <span className="jb-dot-green"></span> Job Awarded
                </div>
                <p className="jb-bids-count">12 Contractor Bids Received</p>
              </div>
            </div>

            <h2 className="jb-section-title mt-24">Project Images</h2>
            <div className="jb-image-grid-4">
              <img src="public/r1.jpg" alt="Job" />
              <img src="public/r2.jpg" alt="Job" />
              <img src="public/r3.jpg" alt="Job" />
              <div className="jb-image-card-more">
                <img src="public/r4.jpg" alt="Job" />
                <div className="jb-image-overlay">
                  <span>View More</span>
                  <RiArrowRightUpLine size={16} />
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="jb-accordion mt-24">
              
              {/* Basic Information Section */}
              <div className={`jb-accordion-item ${expandedSection === 'basic' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'basic' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('basic')}
                >
                  <span>Basic Information</span>
                  <div className={`jb-circle-icon ${expandedSection === 'basic' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'basic' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'basic' && (
                  <div className="jb-accordion-content jb-grid-2 animate-fade">
                    <div><label>Project ID:</label><p>RH-JOB-2025-0148</p></div>
                    <div><label>Property Address:</label><p>27 Rosebay Street, Bondi, NSW 2026</p></div>
                    <div><label>Roof Type:</label><p>Tile Roof</p></div>
                    <div><label>Approx. Roof Area:</label><p>180 m²</p></div>
                    <div><label>Pitch Type:</label><p>Medium Pitch (25-35°)</p></div>
                    <div><label>Stories:</label><p>2</p></div>
                    <div><label>Access Difficulty:</label><p>Moderate</p></div>
                    <div><label>Material Requested:</label><p>Colorbond Metal</p></div>
                    <div className="jb-col-span-2"><label>Urgency Level:</label><p>Flexible (within 30 days)</p></div>
                  </div>
                )}
              </div>

              {/* Automated Quoting Section */}
              <div className={`jb-accordion-item mt-12 ${expandedSection === 'quoting' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'quoting' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('quoting')}
                >
                  <span>Automated Quoting</span>
                  <div className={`jb-circle-icon ${expandedSection === 'quoting' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'quoting' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'quoting' && (
                  <div className="jb-accordion-content jb-grid-2 animate-fade">
                    <div><label>Automated Quoting:</label><p>$8,000 — $9,500 AUD</p></div>
                    <div><label>Provide by:</label><p>roofhero</p></div>
                  </div>
                )}
              </div>

              {/* Documents Section */}
              <div className={`jb-accordion-item mt-12 ${expandedSection === 'docs' ? 'jb-item-active' : ''}`}>
                <div 
                  className={`jb-accordion-header ${expandedSection === 'docs' ? 'jb-bg-active' : ''}`}
                  onClick={() => toggleSection('docs')}
                >
                  <span>Documents</span>
                  <div className={`jb-circle-icon ${expandedSection === 'docs' ? 'jb-bg-dark' : 'jb-bg-orange'}`}>
                    {expandedSection === 'docs' ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                  </div>
                </div>
                {expandedSection === 'docs' && (
                  <div className="jb-accordion-content jb-doc-flex animate-fade">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="jb-doc-pill-card">
                        <div className="jb-doc-icon-box">
                          <img src="public/pdf_ic.png" alt="pdf" width="20" />
                        </div>
                        <div className="jb-doc-text">
                          <span className="jb-doc-name">RooferCoinsurance.pdf</span>
                          <span className="jb-doc-sub">Public Liability Insurance</span>
                        </div>
                        <RiCloseCircleLine size={18} className="jb-doc-close" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: CONTRACTOR MANAGER DETAILS */}
        <div className="jb-details-side">
          <div className="jb-card jb-p-24 jb-award-card">
            <h2 className="jb-section-title">Contractor Manager Details</h2>
            
            <div className="jb-flex-row mt-16">
              <img src="public/toby.jpg" className="jb-avatar" alt="Manager" />
              <div className="jb-manager-info">
                <h4>John Smith Roofing Co.</h4>
                <div className="jb-contact-row-sm">
                  <span><RiMailFill size={12} className="jb-icon-orange" /> john@roofsmith.com</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={12} className="jb-icon-orange" /> +61 123 456 789</span>
                </div>
              </div>
            </div>

            <div className="jb-proposal-section mt-16">
              <label>Proposal Message</label>
              <p className="jb-proposal-text">
                Hi, thank you for providing your roof details. Based on the information shared, 
                we propose removing your existing tiled roof and installing a new Colorbond metal roof, 
                including batten replacement, flashing...
              </p>
            </div>

            <div className="jb-bid-summary-row mt-16">
              <div className="jb-summary-item">
                <label>Final Bid Amount</label>
                <span className="jb-bid-badge">AUD $18,500</span>
              </div>
              <div className="jb-summary-item">
                <label>Price Per Square</label>
                <span className="jb-price-per">$143.3</span>
              </div>
            </div>

            <button className="jb-btn-assign-main mt-24">
              Proposal Details <RiArrowRightUpLine size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: CONTRACTOR BIDS */}
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- MAIN COMPONENT ---
const JobBidding = () => {
  const [activeTab, setActiveTab] = useState('Awaiting Assignment');
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobsData = [
    { id: '#H001', name: 'Michael Turner', address: '22 George St, Sydney NSW 2000', date: '15-03-2025', area: '140 m²', status: 'Awaiting Assignment' },
    { id: '#H002', name: 'James Burfitt', address: '458 Ocean Ave, Bondi, NSW 2026', date: '15-03-2025', area: '140 m²', contractor: 'Jai Dunshea', status: 'Bid Accepted' },
    { id: '#H003', name: 'Michael Turner', address: '22 George St, Sydney NSW 2000', date: '15-03-2025', area: '140 m²', assignedCount: 5, status: 'Bidding In Progress' },
  ];

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesTab = job.status === activeTab;
      const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase()) || job.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, activeTab, itemsPerPage]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const visibleData = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages === 0) return [1];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);
    if (end - start < 2) start = Math.max(1, end - 2);
    for (let i = start; i <= end; i++) if (i > 0) pages.push(i);
    return pages;
  };

  // --- RENDER TOGGLE LOGIC ---
  if (selectedJob) {
    if (selectedJob.status === 'Awaiting Assignment') return <AwaitingAssignmentView job={selectedJob} onBack={() => setSelectedJob(null)} />;
    if (selectedJob.status === 'Bidding In Progress') return <BiddingInProgressView job={selectedJob} onBack={() => setSelectedJob(null)} />;
    if (selectedJob.status === 'Bid Accepted') return <BidAcceptedView job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className='jb-container animate-fade'>
      <h1 className="jb-page-title">Job & Bidding</h1>
      <div className="jb-card">
        <div className="jb-tabs">
          {['Awaiting Assignment', 'Bidding In Progress', 'Bid Accepted'].map(tab => (
            <button key={tab} className={`jb-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>

        <div className="jb-controls">
          <div className="jb-show-entries">
            <span>Show</span>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="jb-dropdown">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div className="jb-search-box">
            <RiSearchLine size={18} className="jb-search-icon" />
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="jb-search-input" />
          </div>
        </div>

        <div className="jb-table-wrapper">
          <table className="jb-table">
            <thead>
              <tr>
                <th>Job ID</th><th>Homeowner Name</th><th>Address</th><th>Request Date</th><th>Roof Area</th>
                {activeTab === 'Bidding In Progress' && <th>Contractor Assigned</th>}
                {activeTab === 'Bid Accepted' && <th>Contractor Name</th>}
                <th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((job) => (
                <tr key={job.id}>
                  <td className="jb-text-dim">{job.id}</td>
                  <td className="jb-font-bold">{job.name}</td>
                  <td className="jb-address-cell">{job.address}</td>
                  <td>{job.date}</td>
                  <td>{job.area}</td>
                  {activeTab === 'Bidding In Progress' && <td>{job.assignedCount}</td>}
                  {activeTab === 'Bid Accepted' && <td>{job.contractor}</td>}
                  <td><span className={`jb-status-pill ${activeTab.toLowerCase().replace(/\s+/g, '-')}`}>{job.status}</span></td>
                  <td><button className="jb-btn-view" onClick={() => setSelectedJob(job)}>View Details <RiArrowRightUpLine size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="jb-pagination">
          <button className="jb-pagi-arrow" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}><RiArrowLeftSLine size={20} /></button>
          {getPageNumbers().map(n => (<button key={n} className={`jb-pagi-num ${currentPage === n ? 'active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</button>))}
          <button className="jb-pagi-arrow" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages || 1))}><RiArrowRightSLine size={20} /></button>
        </div>
      </div>
    </div>
  );
};

export default JobBidding;