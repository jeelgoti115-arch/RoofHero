import React from 'react';

const AccountManager = () => {
  return (
    <div className="account-manager-card">
      <h3>Account Manager Details</h3>
      <div className="manager-profile">
        <img src="public/mike.png" alt="Mike" />
        <div className="manager-info">
          <h5>Mike Hollick</h5>
          <p className='manager-details'>
            <img src='public/mail_ic.png' alt='mail' /> team@roofhero.au 
            <img src='public/Call_ic.png' alt='call' /> 8565533446
          </p>
        </div>
      </div>

      <hr className="divider" />
      
      <h4>Contractor</h4>
      <div className="contractor-status-container">
        <img src='public/contractor-img.png' alt='contractor-img'></img>

        {/* The Text Section */}
        <div className="status-text">
          <h3>Contractor hasn't finalized the job</h3>
          <p>
            Please review the quotes submitted by contractors and select 
            your preferred option to finalize. Only after finalizing will full 
            contractor details appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountManager;