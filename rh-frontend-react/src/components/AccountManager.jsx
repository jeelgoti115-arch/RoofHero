import React from 'react';

const AccountManager = ({ quote, loading, error }) => {
  const acceptedContractor = quote?.assignedContractors?.find((contractor) => contractor.status === 'Accepted');

  const normalizeImagePath = (value) => {
    if (!value) return '/contractor-img.png';
    if (/^(https?:|data:)/.test(value)) return value;
    return `/${value.replace(/^\/+/, '').replace(/^public\//, '')}`;
  };

  if (loading) {
    return (
      <div className="account-manager-card">
        <h3 className="section-title">Account Manager Details</h3>
        <div className="manager-loading">Loading accepted contractor details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="account-manager-card">
        <h3 className="section-title">Account Manager Details</h3>
        <div className="manager-error">{error}</div>
      </div>
    );
  }

  if (!acceptedContractor) {
    return (
      <div className="account-manager-card">
        <h3 className="section-title">Account Manager Details</h3>
        <div className="manager-profile">
          <img src="/mike.png" alt="Mike" />
          <div className="manager-info">
            <h5>Mike Hollick</h5>
            <p className='manager-details'>
              <img src='/mail_ic.png' alt='mail' /> team@roofhero.au
              <img src='/Call_ic.png' alt='call' /> 8565533446
            </p>
          </div>
        </div>

        <hr className="divider" />

        <div className="no-accepted-bid-card">
          <h4>No bid has been accepted yet</h4>
          <p>
            Please review the quotes submitted by contractors and choose your preferred bid. Once accepted, the selected contractor's job details will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-manager-card accepted-card">
      <div className="accepted-card-header">
        <div>
          <p className="section-overline">Accepted Contractor</p>
          <h3 className="section-title">{acceptedContractor.name || acceptedContractor.username || 'Accepted Contractor'}</h3>
        </div>
        <span className="status-pill status-accepted">Accepted</span>
      </div>

      <div className="accepted-contractor-profile">
        <img
          src={normalizeImagePath(acceptedContractor.avatarUrl || acceptedContractor.image || '/contractor-img.png')}
          alt={acceptedContractor.name || 'Contractor'}
          className="accepted-contractor-avatar"
        />
        <div className="accepted-contractor-info">
          <p className="contractor-name">{acceptedContractor.name || acceptedContractor.username}</p>
          <div className="contractor-contact-row">
            <span>
              <img src="/mail_ic.png" alt="mail" />
              {acceptedContractor.email || 'No email provided'}
            </span>
            <span>
              <img src="/Call_ic.png" alt="call" />
              {acceptedContractor.phone || 'No phone provided'}
            </span>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="accepted-details-card">
        <div className="accepted-bid-grid">
          <div className="accepted-bid-item">
            <label>Final Bid</label>
            <p>{acceptedContractor.quoteAmount ? `AUD ${acceptedContractor.quoteAmount}` : 'N/A'}</p>
          </div>
          <div className="accepted-bid-item">
            <label>Price per m²</label>
            <p>{acceptedContractor.pricePerSquare ? `$${acceptedContractor.pricePerSquare}` : 'N/A'}</p>
          </div>
          <div className="accepted-bid-item">
            <label>Estimated Start</label>
            <p>{acceptedContractor.estimatedStartDate || 'N/A'}</p>
          </div>
        </div>

        <div className="accepted-proposal-section">
          <label>Proposal Message</label>
          <p>{acceptedContractor.proposalMessage || 'No proposal message provided.'}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountManager;