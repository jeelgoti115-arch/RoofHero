import { RiArrowRightUpLine, RiErrorWarningFill } from '@remixicon/react';
import React, { useEffect, useState } from 'react';

// Assuming these are in your assets or public folder
import r1 from '/r1.jpg';
import r2 from '/r2.jpg';
import r3 from '/r3.jpg';
import r4 from '/r4.jpg';
import r5 from '/r5.jpg';
import r6 from '/r6.jpg';

const ProposalDetails = ({ job = {}, contractor = {} }) => {
  const galleryImages = job.serviceDetails?.roofImages?.length ? job.serviceDetails.roofImages : [r1, r2, r3, r4, r5, r6];
  
  // --- STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);  // Reject Modal
  const [isModalOpen1, setIsModalOpen1] = useState(false); // Accept Modal
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [contractorStatus, setContractorStatus] = useState('active');

  useEffect(() => {
    if (contractor.status === 'Accepted') {
      setContractorStatus('accepted');
    } else if (contractor.status === 'Rejected') {
      setContractorStatus('rejected');
    } else {
      setContractorStatus('active');
    }
  }, [contractor.status]);

  const quoteId = job.id || job._id;
  const contractorId = contractor.id || contractor._id;

  const handleAcceptContractor = async () => {
    if (!quoteId || !contractorId) {
      setActionError('Unable to accept this bid.');
      return;
    }

    setActionError('');
    setActionLoading(true);

    try {
      const token = localStorage.getItem('roofheroToken');
      const response = await fetch(`/api/homeowner/quote-requests/${quoteId}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ contractorId }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || 'Failed to accept contractor bid.');
      }

      setContractorStatus('accepted');
      setIsModalOpen1(false);
    } catch (error) {
      setActionError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectContractor = async () => {
    if (!quoteId || !contractorId) {
      setActionError('Unable to reject this bid.');
      return;
    }

    setActionError('');
    setActionLoading(true);

    try {
      const token = localStorage.getItem('roofheroToken');
      const response = await fetch(`/api/homeowner/quote-requests/${quoteId}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ contractorId }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || 'Failed to reject contractor bid.');
      }

      setContractorStatus('rejected');
      setIsModalOpen(false);
    } catch (error) {
      setActionError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const projectTitle = job.serviceDetails?.serviceTitle || job.serviceDetails?.serviceType || job.serviceDetails?.roofService || 'Roof Replacement';
  const projectLocation = job.serviceDetails?.propertyAddress || job.serviceDetails?.address || contractor.location || 'Project Location';
  const projectId = job.id || job._id || contractor.contractorId || '#RPH-2025-00123';
  const description = contractor.proposalMessage || contractor.description || contractor.proposal || 'No proposal description has been provided.';
  const quoteRange = job.autoEstimate || job.serviceDetails?.quoteRange || job.serviceDetails?.estimateRange || job.quoteEstimate || 'Not available';
  const finalQuote = contractor.quoteAmount || contractor.bidAmount || contractor.price || 'TBD';
  const pricePerSq = contractor.pricePerSquare || contractor.pricePerSq || contractor.pricePerSqm || 'N/A';
  const homeownerImages = job.serviceDetails?.roofImages || [];

  return (
    <div className="white-card-box">
      {/* Upper Section: Split into Content and Pricing */}
      <div className="proposal-split-layout">
        {/* Left Side: Text Content */}
        <div className="proposal-left">
          <h2 className="project-main-title">{projectTitle} – {projectLocation}</h2>
          <span className="project-serial">{projectId}</span>
          
          <div className="description-wrap">
            <h4>Proposal Description</h4>
            <p>{description}</p>
          </div>
        </div>

        {/* Right Side: Pricing Sidebar */}
        <div className="proposal-right-pricing">
          <div className="price-stack">
            <label>Quote Range Provided (Auto Estimate):</label>
            <span className="val-muted">{quoteRange}</span>
          </div>
          <div className="price-stack highlight-green">
            <label>Final Quote Price</label>
            <span className="val-large-green">{typeof finalQuote === 'number' ? `$${finalQuote}` : finalQuote}</span>
          </div>
          <div className="price-stack">
            <label>Price Per Square</label>
            <span className="val-bold">{typeof pricePerSq === 'number' ? `$${pricePerSq}` : pricePerSq}</span>
          </div>

          {/* --- CONDITIONAL RENDERING BASED ON STATUS --- */}
          <div className="action-area-pd">
            {actionError && <div className="status-message-rejected"><span>{actionError}</span></div>}
            {contractorStatus === 'active' && (
              <>
                <button className="accept-quote-btn-lg" onClick={() => setIsModalOpen1(true)} disabled={actionLoading}>
                  {actionLoading ? 'Processing...' : 'Accept Quote'} <RiArrowRightUpLine size={18} />
                </button>
                <button className="cancel-quote-link" onClick={() => setIsModalOpen(true)} disabled={actionLoading}>
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
        <h4 className="gallery-title">Homeowner Quote Images</h4>
        <div className="project-gallery-grid">
          {(homeownerImages.length ? homeownerImages : galleryImages).map((imgSrc, index) => (
          <img 
            key={index} 
            src={imgSrc} 
            alt={`Quote image ${index + 1}`} 
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
               <button className="modal-btn" onClick={handleAcceptContractor} disabled={actionLoading}>
                 {actionLoading ? 'Processing...' : 'Accept Bid'} <RiArrowRightUpLine size={18} />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalDetails;