import React, { useState, useEffect } from 'react';
import Accordion from './Accordion';
import { RiCloseCircleLine } from '@remixicon/react';

const ProjectDetails = () => {
  // Track which section is open by its title string
  const [openSection, setOpenSection] = useState('Basic Information');
  const [homeowner, setHomeowner] = useState(null);
  const [quoteInfo, setQuoteInfo] = useState(null);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeownerData = async () => {
      const token = window.localStorage.getItem('roofheroToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/homeowner/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();
        setHomeowner(data.homeowner);
        setQuoteInfo(data.quote);
      } catch (error) {
        console.error('Unable to fetch homeowner details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeownerData();
  }, []);

  const handleToggle = (title) => {
    // If clicking the one already open, close it (set to null), otherwise open the new one
    setOpenSection(openSection === title ? null : title);
  };

  const images = quoteInfo?.serviceDetails?.roofImages?.length
    ? quoteInfo.serviceDetails.roofImages
    : ['/roof1.jpg', '/roof2.jpg', '/roof3.jpg', '/roof4.jpg'];

  return (
    <div className="project-details-card">
      <h2>Project details</h2>
      <div className="card-user-header">
        <div className="user-info">
          <img src="public/user-image.png" alt={homeowner?.fullName || 'Homeowner'} className="user-img" />
          <div>
            <h3>{homeowner?.fullName || 'Homeowner Name'}</h3>
            <p>
              <img src='public/mail_ic.png' alt='mail' className='user-icons' /> {homeowner?.email || 'email@example.com'} | 
              <img src='public/Call_ic.png' alt='call' className='user-icons' /> {homeowner?.phone || '000-000-0000'}
            </p>
          </div>
        </div>
        <div className='side-info'>
          <div className="status-tag">● Open For Bids</div>
          <p>{quoteInfo ? 'Contractors reviewing your quote' : 'No quote submitted yet'}</p>
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
          <div className="info-item-pd"><p>Project ID:</p> <span>{quoteInfo ? `RH-${quoteInfo.id?.toString().slice(-6).toUpperCase()}` : 'RH-JOB-2025-0148'}</span></div>
          <div className="info-item-pd"><p>Property Address:</p> <span>{quoteInfo?.serviceDetails?.propertyAddress || quoteInfo?.serviceDetails?.address || '27 Rosebay Street, Bondi, NSW 2026'}</span></div>
          <div className="info-item-pd"><p>Service Type:</p> <span>{quoteInfo?.serviceDetails?.serviceType || quoteInfo?.serviceDetails?.serviceRequested || 'Roof Replacement'}</span></div>
          <div className="info-item-pd"><p>Current Roof Material:</p> <span>{quoteInfo?.serviceDetails?.currentRoofMaterial || quoteInfo?.serviceDetails?.currentMaterial || quoteInfo?.serviceDetails?.currentRoof || 'Slate'}</span></div>
          <div className="info-item-pd"><p>Material Requested:</p> <span>{quoteInfo?.serviceDetails?.materialRequested || quoteInfo?.serviceDetails?.requestedMaterial || 'Metal'}</span></div>
          <div className="info-item-pd"><p>Steep:</p> <span>{quoteInfo?.serviceDetails?.steep || quoteInfo?.serviceDetails?.roofSlope || 'Flat'}</span></div>
          <div className="info-item-pd"><p>Roof Faces:</p> <span>{quoteInfo?.serviceDetails?.roofFaces || quoteInfo?.serviceDetails?.faces || 'Medium (3-4 faces, valleys)'}</span></div>
          <div className="info-item-pd"><p>Storey:</p> <span>{quoteInfo?.serviceDetails?.storey || quoteInfo?.serviceDetails?.story || 'Double Storey'}</span></div>
          <div className="info-item-pd"><p>TimeLine:</p> <span>{quoteInfo?.serviceDetails?.timeline || quoteInfo?.serviceDetails?.timeLine || 'Within the Next Month'}</span></div>
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
            <span className="price">{quoteInfo?.serviceDetails?.quoteRange || quoteInfo?.quoteRange || quoteInfo?.serviceDetails?.estimatedQuote || '$8,000 – $9,500 AUD'}</span>
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