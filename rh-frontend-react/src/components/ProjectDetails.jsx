import React, { useState } from 'react';
import Accordion from './Accordion';
import { RiCloseCircleLine } from '@remixicon/react';

const ProjectDetails = () => {
  // Track which section is open by its title string
  const [openSection, setOpenSection] = useState('Basic Information');

  const handleToggle = (title) => {
    // If clicking the one already open, close it (set to null), otherwise open the new one
    setOpenSection(openSection === title ? null : title);
  };

  const images = ['/roof1.jpg', '/roof2.jpg', '/roof3.jpg', '/roof4.jpg'];

  return (
    <div className="project-details-card">
      <h2>Project details</h2>
      <div className="card-user-header">
        <div className="user-info">
          <img src="public/dashboard1-profile.png" alt="Samantha" className="user-img" />
          <div>
            <h3>Samantha Hollick</h3>
            <p>
              <img src='public/mail_ic.png' alt='mail' className='user-icons' /> JasperCanning@dayrep.com | 
              <img src='public/Call_ic.png' alt='call' className='user-icons' /> 937-304-8161
            </p>
          </div>
        </div>
        <div className='side-info'>
          <div className="status-tag">● Open For Bids</div>
          <p>12 Contractor Bids Received</p>
        </div>
      </div>

      <div className="project-images-grid">
        {images.map((img, i) => (
          <img key={i} src={img} alt="roof" />
        ))}
      </div>

      {/* 1. Basic Information Section */}
      <Accordion 
        title="Basic Information" 
        isOpen={openSection === "Basic Information"} 
        onToggle={() => handleToggle("Basic Information")}
      >
        <div className="info-grid">
          <div className="info-item-pd"><p>Project ID:</p> <span>RH-JOB-2025-0148</span></div>
          <div className="info-item-pd"><p>Property Address:</p> <span>27 Rosebay Street, Bondi, NSW 2026</span></div>
          <div className="info-item-pd"><p>Roof Type:</p> <span>Tile Roof</span></div>
          <div className="info-item-pd"><p>Approx. Roof Area:</p> <span>180 m²</span></div>
          <div className="info-item-pd"><p>Pitch Type:</p> <span>Medium Pitch (25-35°)</span></div>
          <div className="info-item-pd"><p>Stories:</p> <span>2</span></div>
          <div className="info-item-pd"><p>Access Difficulty:</p> <span>Moderate</span></div>
          <div className="info-item-pd"><p>Material Requested:</p> <span>Colorbond Metal</span></div>
          <div className="info-item-pd"><p>Urgency Level:</p> <span>Flexible (within 30 days)</span></div>
        </div>
      </Accordion>

      {/* 2. Automated Quoting Section */}
      <Accordion 
        title="Automated Quoting" 
        isOpen={openSection === "Automated Quoting"} 
        onToggle={() => handleToggle("Automated Quoting")}
      >
        <div className="quoting-grid">
          <div className="quote-row">
            <p>Automated Quoting:</p>
            <span className="price">$8,000 – $9,500 AUD</span>
            <p>Provide by:</p>
            <span className="provider">roofhero</span>
          </div>
        </div>
      </Accordion>

      {/* 3. Documents Section */}
      <Accordion 
        title="Documents" 
        isOpen={openSection === "Documents"} 
        onToggle={() => handleToggle("Documents")}
      >
        <div className="documents-grid">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="doc-card">
              <div className="doc-icon-box">
                <img src="public/pdf_ic.png" alt="pdf" />
              </div>
              <div className="doc-info">
                <h4>RooferCoinsurance.pdf</h4>
                <p>  Liability Insurance</p>
              </div>
              <button className="doc-remove-btn"><RiCloseCircleLine /></button>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default ProjectDetails;