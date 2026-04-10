import { RiArrowRightUpLine, RiErrorWarningFill } from '@remixicon/react';
import React, { useState } from 'react';

// Assuming these are in your assets or public folder
import r1 from '/r1.jpg';
import r2 from '/r2.jpg';
import r3 from '/r3.jpg';
import r4 from '/r4.jpg';
import r5 from '/r5.jpg';
import r6 from '/r6.jpg';

const ProposalDetails = () => {
  const galleryImages = [r1, r2, r3, r4, r5, r6];
  
  // --- STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);  // Reject Modal
  const [isModalOpen1, setIsModalOpen1] = useState(false); // Accept Modal
  
  // Status can be: 'active', 'accepted', 'rejected'
  const [contractorStatus, setContractorStatus] = useState('active');

  // --- HANDLERS ---
  const handleAcceptContractor = () => {
    setContractorStatus('accepted');
    setIsModalOpen1(false);
  };

  const handleRejectContractor = () => {
    setContractorStatus('rejected');
    setIsModalOpen(false);
  };

  return (
    <div className="white-card-box">
      {/* Upper Section: Split into Content and Pricing */}
      <div className="proposal-split-layout">
        {/* Left Side: Text Content */}
        <div className="proposal-left">
          <h2 className="project-main-title">Roof Replacement – Bondi Beach</h2>
          <span className="project-serial">#RPH-2025-00123</span>
          
          <div className="description-wrap">
            <h4>Proposal Description</h4>
            <p>
              Thank you for the opportunity to quote on your roofing project at 27 Rosebay Street. 
              Based on the project scope and details provided, we recommend a complete tile-to-Colorbond 
              metal roof replacement.
            </p>
            <p>
              Our licensed and experienced team will start by safely removing the existing roof tiles. 
              We will thoroughly inspect the roof's substructure for any damage or weak spots.
            </p>
          </div>
        </div>

        {/* Right Side: Pricing Sidebar */}
        <div className="proposal-right-pricing">
          <div className="price-stack">
            <label>Quote Range Provided (Auto Estimate):</label>
            <span className="val-muted">$8,000 – $9,500 AUD</span>
          </div>
          <div className="price-stack highlight-green">
            <label>Final Quote Price</label>
            <span className="val-large-green">$26,000</span>
          </div>
          <div className="price-stack">
            <label>Price Per Square</label>
            <span className="val-bold">$143.3</span>
          </div>

          {/* --- CONDITIONAL RENDERING BASED ON STATUS --- */}
          <div className="action-area-pd">
            {contractorStatus === 'active' && (
              <>
                <button className="accept-quote-btn-lg" onClick={() => setIsModalOpen1(true)}>
                  Accept Quote <RiArrowRightUpLine size={18} />
                </button>
                <button className="cancel-quote-link" onClick={() => setIsModalOpen(true)}>
                  Cancel Quote
                </button>
              </>
            )}

            {contractorStatus === 'rejected' && (
              <div className="status-message-rejected">
                <RiErrorWarningFill size={20} color="#fa5a25" />
                <span>Contractor has been rejected.</span>
              </div>
            )}

            {contractorStatus === 'accepted' && (
              <div className="status-message-accepted">
                <span className="success-check">✔</span>
                <span>Contractor has been accepted.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Full Width Gallery */}
      <div className="project-gallery-section">
        <h4 className="gallery-title">Project Images</h4>
        <div className="project-gallery-grid">
          {galleryImages.map((imgSrc, index) => (
          <img 
            key={index} 
            src={imgSrc} 
            alt={`Project ${index + 1}`} 
            className="gallery-thumb" 
          />
          ))}
        </div>
      </div>

      {/* --- REJECT MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon-container">
               <img src="public/bidcard-qr.svg" alt="Reject" />
            </div>
            <h2>Are you sure you want to reject this contractor?</h2>
            <p>
              If you reject this contractor, they will no longer be able to bid or work on your job. This action cannot be undone.
            </p>
            <div className='modal-btns'>
              <button className="modal-btn-outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="modal-btn-reject" onClick={handleRejectContractor}>
                Yes, Reject Contractor <RiArrowRightUpLine size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUCCESS (ACCEPT) MODAL OVERLAY --- */}
      {isModalOpen1 && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon-container">
               <img src="public/bidcard-qa.svg" alt="Success" />
            </div>
            <h2>Quote Accepted Successfully</h2>
            <p>
              Your roofing project has been confirmed. The selected contractor 
              will contact you soon to coordinate the next steps.
            </p>
            <div className='modal-btns'>
               <button className="modal-btn-outline" onClick={() => setIsModalOpen1(false)}>
                 Cancel
               </button>
               <button className="modal-btn" onClick={handleAcceptContractor}>
                 Accept Bid <RiArrowRightUpLine size={18} />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalDetails;