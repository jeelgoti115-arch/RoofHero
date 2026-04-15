// eslint-disable react-hooks/exhaustive-deps 
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

const AwaitingAssignmentView = ({ job, onBack, availableContractors, loadingContractors, contractorError, onAssign }) => {
  const [expandedSection, setExpandedSection] = useState('basic');
  const [selectedContractorIds, setSelectedContractorIds] = useState([]);
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [assignSuccess, setAssignSuccess] = useState('');
  const details = job.serviceDetails || {};

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleContractorSelect = (contractorId) => {
    const id = contractorId?.toString()
    if (!id) return

    setSelectedContractorIds((currentIds) => {
      const isSelected = currentIds.includes(id)
      if (isSelected) {
        return currentIds.filter((currentId) => currentId !== id)
      }
      return [...currentIds, id]
    })
    setAssignError('');
    setAssignSuccess('');
  };

  const handleAssign = async () => {
    if (!selectedContractorIds.length) {
      setAssignError('Please select at least one contractor to assign.');
      return;
    }

    setAssignError('');
    setAssignSuccess('');
    setAssigning(true);
    try {
      await onAssign(job.id, selectedContractorIds);
      setAssignSuccess('Contractors assigned successfully.');
    } catch (error) {
      setAssignError(error?.message || 'Failed to assign contractors.');
    } finally {
      setAssigning(false);
    }
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
                <h3>{job.fullName || job.name || 'Homeowner'}</h3>
                <div className="jb-contact-row">
                  <span><RiMailFill size={14} className="jb-icon-orange" /> {job.email || 'No email'}</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={14} className="jb-icon-orange" /> {job.phone || 'No phone'}</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="jb-status-tag jb-tag-open">
                  <span className="jb-dot"></span> {job.status || 'Awaiting Assignment'}
                </div>
                <p className="jb-bids-count">{job.status === 'Awaiting Assignment' ? 'Waiting for Assignment' : ''}</p>
              </div>
            </div>
            <h2 className="jb-section-title mt-24">Project Images</h2>
            <div className="jb-image-grid-4">
              {(details.roofImages?.length ? details.roofImages : ['public/r1.jpg', 'public/r2.jpg', 'public/r3.jpg', 'public/r4.jpg']).slice(0, 4).map((src, index) => (
                <img key={index} src={src} alt={`Job ${index + 1}`} />
              ))}
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
                    <div><label>Project ID:</label><p>{job.id}</p></div>
                    <div><label>Property Address:</label><p>{details.propertyAddress || details.address || 'Not specified'}</p></div>
                    <div><label>Roof Type:</label><p>{details.roofType || details.roofMaterial || 'Not specified'}</p></div>
                    <div><label>Approx. Roof Area:</label><p>{details.roofArea || details.approxRoofArea || 'Not specified'}</p></div>
                    <div><label>Pitch Type:</label><p>{details.pitchType || details.roofPitch || 'Not specified'}</p></div>
                    <div><label>Stories:</label><p>{details.stories || details.levels || 'Not specified'}</p></div>
                    <div><label>Access Difficulty:</label><p>{details.accessDifficulty || details.access || 'Not specified'}</p></div>
                    <div><label>Material Requested:</label><p>{details.materialRequested || details.material || 'Not specified'}</p></div>
                    <div className="jb-col-span-2"><label>Urgency Level:</label><p>{details.urgency || details.urgencyLevel || 'Not specified'}</p></div>
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
              <input type="text" placeholder="Search Contractor" disabled />
            </div>
            <div className="jb-contractor-list">
              {loadingContractors ? (
                <div className="jb-loading-message">Loading available contractors...</div>
              ) : contractorError ? (
                <div className="jb-error-message">{contractorError}</div>
              ) : availableContractors.length === 0 ? (
                <div className="jb-no-data">No available contractors found.</div>
              ) : (
                availableContractors.map((contractor) => (
                  <div key={contractor._id} className="jb-contractor-item">
                    <div className="jb-flex-row">
                      <img src={contractor.avatarUrl || 'public/contractor2.jpg'} className="jb-avatar-sm" alt="C" />
                      <div className="jb-c-info">
                        <p className="jb-c-name">{contractor.name || contractor.username}</p>
                        <p className="jb-c-loc">{contractor.regions?.join(', ') || 'Available contractor'}</p>
                      </div>
                      <input
                        type="checkbox"
                        className="jb-checkbox"
                        value={contractor._id}
                        checked={selectedContractorIds.includes(contractor._id?.toString())}
                        onChange={() => handleContractorSelect(contractor._id)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            {assignError && <div className="jb-error-message mt-12">{assignError}</div>}
            {assignSuccess && <div className="jb-success-message mt-12">{assignSuccess}</div>}
            <button className="jb-btn-assign-main mt-24" onClick={handleAssign} disabled={!selectedContractorIds.length || assigning || loadingContractors || availableContractors.length === 0}>
              {assigning ? 'Assigning...' : 'Assign Selected Contractors'} <RiArrowRightUpLine size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BiddingInProgressView = ({ job, onBack, availableContractors, loadingContractors, contractorError }) => {
  const [expandedSection, setExpandedSection] = useState('basic');
  const navigate = useNavigate(); // Initialize navigation
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [modalContractor, setModalContractor] = useState(null);
  const details = job.serviceDetails || {};

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleButtonClick = (contractor) => {
    setIsModalOpen(false); // Close the modal first
    navigate('/project-details', { state: { job, contractor } });
  };

  const contractors = (job.assignedContractors || []).map((contractor, index) => ({
    id: contractor.id?.toString() || contractor._id?.toString() || index,
    name: contractor.name || contractor.username || 'Contractor',
    image: contractor.avatarUrl || 'public/contractor2.jpg',
    price: contractor.quoteAmount || 'TBD',
    rating: contractor.rating || '4.7',
    contractorId: contractor.username ? `#${contractor.username}` : contractor.id?.toString().slice(-6) || `#${index + 1}`,
    pricePerSq: contractor.pricePerSquare || 'N/A',
    isRejected: contractor.status === 'Rejected',
    status: contractor.status || 'New Arrival',
    proposalMessage: contractor.proposalMessage || '',
  }))

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
                <h3>{job.fullName || job.name || 'Homeowner'}</h3>
                <div className="jb-contact-row">
                  <span><RiMailFill size={14} className="jb-icon-orange" /> {job.email || 'No email'}</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={14} className="jb-icon-orange" /> {job.phone || 'No phone'}</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="jb-status-tag jb-tag-open-green">
                  <span className="jb-dot-green"></span> {job.status || 'Bidding In Progress'}
                </div>
                <p className="jb-bids-count">{job.assignedContractors?.length ? `${job.assignedContractors.length} contractors assigned` : 'Contractor bids in progress'}</p>
              </div>
            </div>

            <h2 className="jb-section-title mt-24">Project Images</h2>
            <div className="jb-image-grid-4">
              {(details.roofImages?.length ? details.roofImages : ['public/r1.jpg', 'public/r2.jpg', 'public/r3.jpg', 'public/r4.jpg']).slice(0, 4).map((src, index) => (
                <img key={index} src={src} alt={`Job ${index + 1}`} />
              ))}
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
                    <div><label>Project ID:</label><p>{job.id}</p></div>
                    <div><label>Property Address:</label><p>{details.propertyAddress || details.address || 'Not specified'}</p></div>
                    <div><label>Roof Type:</label><p>{details.roofType || details.roofMaterial || 'Not specified'}</p></div>
                    <div><label>Approx. Roof Area:</label><p>{details.roofArea || details.approxRoofArea || 'Not specified'}</p></div>
                    <div><label>Pitch Type:</label><p>{details.pitchType || details.roofPitch || 'Not specified'}</p></div>
                    <div><label>Stories:</label><p>{details.stories || details.levels || 'Not specified'}</p></div>
                    <div><label>Access Difficulty:</label><p>{details.accessDifficulty || details.access || 'Not specified'}</p></div>
                    <div><label>Material Requested:</label><p>{details.materialRequested || details.material || 'Not specified'}</p></div>
                    <div className="jb-col-span-2"><label>Urgency Level:</label><p>{details.urgency || details.urgencyLevel || 'Not specified'}</p></div>
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
              <input type="text" placeholder="Search Contractor" disabled />
            </div>
            <div className="jb-contractor-list">
              {loadingContractors ? (
                <div className="jb-loading-message">Loading available contractors...</div>
              ) : contractorError ? (
                <div className="jb-error-message">{contractorError}</div>
              ) : availableContractors.length === 0 ? (
                <div className="jb-no-data">No available contractors found.</div>
              ) : (
                availableContractors.map((contractor) => {
                  const contractorId = contractor._id?.toString()
                  const isAssigned = job.assignedContractors?.some((entry) => entry.id?.toString() === contractorId)
                    || job.assignedContractor?.id?.toString() === contractorId
                  return (
                    <div key={contractor._id} className="jb-contractor-item">
                      <div className="jb-flex-row">
                        <img src={contractor.avatarUrl || 'public/contractor2.jpg'} className="jb-avatar-sm" alt="C" />
                        <div className="jb-c-info">
                          <p className="jb-c-name">{contractor.name || contractor.username}</p>
                          <p className="jb-c-loc">{contractor.regions?.join(', ') || 'Available contractor'}</p>
                        </div>
                        {isAssigned ? (
                          <span className="jb-assigned-text">Assigned</span>
                        ) : (
                          <input type="checkbox" className="jb-checkbox" disabled />
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div className="jb-info-note mt-24">
              Assignment is locked.
            </div>
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
  
              <div className="service-tag">{item.status === 'Pending Review' ? 'Bid Submitted' : item.status === 'New Arrival' ? 'Awaiting Bid' : 'Roof Replacement'}</div>
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
              {item.proposalMessage && (
                <div className="col">
                  <label>Proposal</label>
                  <span>{item.proposalMessage}</span>
                </div>
              )}
  
              <div className="card-actions">
                <button className="btn-white" onClick={() => handleButtonClick(item)}>View Details <RiArrowRightUpLine size={16} /></button>
                {!item.isRejected ? (
                  <button 
                    className="btn-orange" 
                    onClick={() => { setModalContractor(item); setIsModalOpen(true); }}
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
              <button className="modal-btn" onClick={() => handleButtonClick(modalContractor || contractors[0])}>
                View Project <RiArrowRightUpLine size={18} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const BidAcceptedView = ({ job, onBack }) => {
  const [expandedSection, setExpandedSection] = useState('basic');
  const scrollRef = useRef(null);
  const details = job.serviceDetails || {};

  const contractors = (job.assignedContractors || []).map((contractor, index) => ({
    id: contractor.id?.toString() || contractor._id?.toString() || index,
    name: contractor.name || contractor.username || 'Contractor',
    image: contractor.avatarUrl || 'public/contractor2.jpg',
    price: contractor.quoteAmount || contractor.pricePerSquare || 'TBD',
    rating: contractor.rating || '4.7',
    contractorId: contractor.username ? `#${contractor.username}` : contractor.id?.toString().slice(-6) || `#${index + 1}`,
    pricePerSq: contractor.pricePerSquare || 'N/A',
    isRejected: contractor.status === 'Rejected',
    status: contractor.status || 'New Arrival',
    proposalMessage: contractor.proposalMessage || '',
    email: contractor.email || 'No email',
    phone: contractor.phone || 'No phone',
  }))

  const acceptedContractor = job.assignedContractor || (job.assignedContractors || []).find((contractor) => contractor.status === 'Accepted') || (job.assignedContractors || [])[0] || null;
  const acceptedContractorDetails = acceptedContractor ? {
    name: acceptedContractor.name || acceptedContractor.username || 'Contractor',
    email: acceptedContractor.email || 'No email',
    phone: acceptedContractor.phone || 'No phone',
    proposalMessage: acceptedContractor.proposalMessage || 'No proposal message provided.',
    bidAmount: acceptedContractor.quoteAmount || acceptedContractor.pricePerSquare || 'TBD',
    pricePerSquare: acceptedContractor.pricePerSquare || 'N/A',
    image: acceptedContractor.avatarUrl || 'public/contractor2.jpg',
  } : null;

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
                <h3>{job.fullName || job.name || 'Homeowner'}</h3>
                <div className="jb-contact-row">
                  <span><RiMailFill size={14} className="jb-icon-orange" /> {job.email || 'No email'}</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={14} className="jb-icon-orange" /> {job.phone || 'No phone'}</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="jb-status-tag jb-tag-open-green">
                  <span className="jb-dot-green"></span> {job.status || 'Bid Accepted'}
                </div>
                <p className="jb-bids-count">{job.assignedContractors?.length ? `Assigned to ${job.assignedContractors.map((c) => c.name).join(', ')}` : 'Bid accepted'}</p>
              </div>
            </div>

            <h2 className="jb-section-title mt-24">Project Images</h2>
            <div className="jb-image-grid-4">
              {(details.roofImages?.length ? details.roofImages : ['public/r1.jpg', 'public/r2.jpg', 'public/r3.jpg', 'public/r4.jpg']).slice(0, 4).map((src, index) => (
                <img key={index} src={src} alt={`Job ${index + 1}`} />
              ))}
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
                    <div><label>Project ID:</label><p>{job.id}</p></div>
                    <div><label>Property Address:</label><p>{details.propertyAddress || details.address || 'Not specified'}</p></div>
                    <div><label>Roof Type:</label><p>{details.roofType || details.roofMaterial || 'Not specified'}</p></div>
                    <div><label>Approx. Roof Area:</label><p>{details.roofArea || details.approxRoofArea || 'Not specified'}</p></div>
                    <div><label>Pitch Type:</label><p>{details.pitchType || details.roofPitch || 'Not specified'}</p></div>
                    <div><label>Stories:</label><p>{details.stories || details.levels || 'Not specified'}</p></div>
                    <div><label>Access Difficulty:</label><p>{details.accessDifficulty || details.access || 'Not specified'}</p></div>
                    <div><label>Material Requested:</label><p>{details.materialRequested || details.material || 'Not specified'}</p></div>
                    <div className="jb-col-span-2"><label>Urgency Level:</label><p>{details.urgency || details.urgencyLevel || 'Not specified'}</p></div>
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
              <img src={acceptedContractorDetails?.image || 'public/contractor2.jpg'} className="jb-avatar" alt="Manager" />
              <div className="jb-manager-info">
                <h4>{acceptedContractorDetails?.name || 'Contractor Manager'}</h4>
                <div className="jb-contact-row-sm">
                  <span><RiMailFill size={12} className="jb-icon-orange" /> {acceptedContractorDetails?.email || 'No email'}</span>
                  <span className="jb-divider">|</span>
                  <span><RiPhoneFill size={12} className="jb-icon-orange" /> {acceptedContractorDetails?.phone || 'No phone'}</span>
                </div>
              </div>
            </div>

            <div className="jb-proposal-section mt-16">
              <label>Proposal Message</label>
              <p className="jb-proposal-text">
                {acceptedContractorDetails?.proposalMessage || 'No proposal message provided.'}
              </p>
            </div>

            <div className="jb-bid-summary-row mt-16">
              <div className="jb-summary-item">
                <label>Final Bid Amount</label>
                <span className="jb-bid-badge">{acceptedContractorDetails?.bidAmount ? `AUD ${acceptedContractorDetails.bidAmount}` : 'TBD'}</span>
              </div>
              <div className="jb-summary-item">
                <label>Price Per Square</label>
                <span className="jb-price-per">{acceptedContractorDetails?.pricePerSquare ? `$${acceptedContractorDetails.pricePerSquare}` : 'N/A'}</span>
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
  
              <div className="service-tag">{item.status === 'Pending Review' ? 'Bid Submitted' : item.status === 'New Arrival' ? 'Awaiting Bid' : 'Roof Replacement'}</div>
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
              {item.proposalMessage && (
                <div className="col">
                  <label>PROPOSAL:</label>
                  <span>{item.proposalMessage}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- MAIN COMPONENT ---
const ACCEPTED_STATUSES = ['Bid Accepted', 'Site Inspection Scheduled', 'Materials Ordered', 'Completed'];

const JobBidding = () => {
  const [activeTab, setActiveTab] = useState('Awaiting Assignment');
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [availableContractors, setAvailableContractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contractorLoading, setContractorLoading] = useState(false);
  const [error, setError] = useState('');
  const [contractorError, setContractorError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('roofheroToken');
        const response = await fetch('/api/admin/quote-requests', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        if (!response.ok) {
          throw new Error('Unable to load quote requests');
        }
        const data = await response.json();
        setJobsData(data.map((quote) => ({
          ...quote,
          status: quote.status || 'Awaiting Assignment',
          id: quote._id,
          date: quote.requestedAt ? new Date(quote.requestedAt).toLocaleDateString() : 'Unknown',
          area: quote.serviceDetails?.roofArea || quote.serviceDetails?.approxRoofArea || 'Not specified',
          address: quote.serviceDetails?.propertyAddress || quote.serviceDetails?.address || 'Not specified',
          name: quote.fullName || 'Homeowner',
          assignedCount: quote.assignedCount || 0,
          assignedContractor: quote.assignedContractor || null,
          assignedContractors: quote.assignedContractors || (quote.assignedContractor ? [quote.assignedContractor] : []),
        })));
      } catch (err) {
        setError(err.message || 'Error loading jobs');
      } finally {
        setLoading(false);
      }
    };

    const fetchContractors = async () => {
      setContractorLoading(true);
      setContractorError('');
      try {
        const token = localStorage.getItem('roofheroToken');
        const response = await fetch('/api/admin/users?role=contractor', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        if (!response.ok) {
          throw new Error('Unable to load contractors');
        }
        const data = await response.json();
        setAvailableContractors(data);
      } catch (err) {
        setContractorError(err.message || 'Error loading contractors');
      } finally {
        setContractorLoading(false);
      }
    };

    fetchJobs();
    fetchContractors();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesTab = activeTab === 'Bid Accepted'
        ? ACCEPTED_STATUSES.includes(job.status)
        : job.status === activeTab;
      const matchesSearch = (job.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (job.id || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, jobsData]);

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
  const assignContractorToJob = async (quoteId, contractorIds) => {
    const ids = Array.isArray(contractorIds)
      ? contractorIds.map((id) => id?.toString()).filter(Boolean)
      : []

    if (!ids.length) {
      throw new Error('Please select at least one contractor first.')
    }
    const token = localStorage.getItem('roofheroToken')
    const response = await fetch(`/api/admin/quote-requests/${quoteId}/assign`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ contractorIds: ids }),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || 'Failed to assign contractor')
    }
    const updated = await response.json()
    const normalized = {
      ...updated,
      status: updated.status || 'Bidding In Progress',
      id: updated._id,
      date: updated.requestedAt ? new Date(updated.requestedAt).toLocaleDateString() : 'Unknown',
      area: updated.serviceDetails?.roofArea || updated.serviceDetails?.approxRoofArea || 'Not specified',
      address: updated.serviceDetails?.propertyAddress || updated.serviceDetails?.address || 'Not specified',
      name: updated.fullName || 'Homeowner',
      assignedContractor: updated.assignedContractor || null,
      assignedContractors: updated.assignedContractors || (updated.assignedContractor ? [updated.assignedContractor] : []),
    }
    setJobsData((prev) => prev.map((job) => (job.id === quoteId ? normalized : job)))
    setSelectedJob(normalized)
    return normalized
  }

  if (selectedJob) {
    if (selectedJob.status === 'Awaiting Assignment') return <AwaitingAssignmentView job={selectedJob} onBack={() => setSelectedJob(null)} availableContractors={availableContractors} loadingContractors={contractorLoading} contractorError={contractorError} onAssign={assignContractorToJob} />;
    if (selectedJob.status === 'Bidding In Progress') return <BiddingInProgressView job={selectedJob} onBack={() => setSelectedJob(null)} availableContractors={availableContractors} loadingContractors={contractorLoading} contractorError={contractorError} />;
    if (ACCEPTED_STATUSES.includes(selectedJob.status)) return <BidAcceptedView job={selectedJob} onBack={() => setSelectedJob(null)} />;
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
          {loading ? (
            <div className="jb-loading-message">Loading quote requests...</div>
          ) : error ? (
            <div className="jb-error-message">{error}</div>
          ) : (
            <table className="jb-table">
              <thead>
                <tr>
                  <th>Job ID</th><th>Homeowner Name</th><th>Address</th><th>Request Date</th><th>Roof Area</th>
                  {((activeTab === 'Bidding In Progress') || (activeTab === 'Bid Accepted')) && <th>Contractor</th>}
                  <th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleData.length === 0 ? (
                  <tr><td colSpan={((activeTab === 'Bidding In Progress') || (activeTab === 'Bid Accepted')) ? 8 : 7} className="jb-no-data">No quote requests found.</td></tr>
                ) : visibleData.map((job) => (
                  <tr key={job.id}>
                    <td className="jb-text-dim">{job.id}</td>
                    <td className="jb-font-bold">{job.name}</td>
                    <td className="jb-address-cell">{job.address}</td>
                    <td>{job.date}</td>
                    <td>{job.area}</td>
                    {((activeTab === 'Bidding In Progress') || (activeTab === 'Bid Accepted')) && (
                      <td>{job.assignedContractors?.length ? job.assignedContractors.map((c) => c.name).join(', ') : job.assignedContractor?.name || 'Not assigned'}</td>
                    )}
                    <td><span className={`jb-status-pill ${job.status.toLowerCase().replace(/\s+/g, '-')}`}>{job.status}</span></td>
                    <td><button className="jb-btn-view" onClick={() => setSelectedJob(job)}>View Details <RiArrowRightUpLine size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

export default JobBidding