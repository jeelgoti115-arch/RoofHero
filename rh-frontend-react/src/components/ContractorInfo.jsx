import React, { useState } from 'react';
import { RiCheckboxCircleFill, RiCloseCircleLine, RiMailFill, RiPhoneFill, RiStarFill } from '@remixicon/react';

import r1 from '/r1.jpg';
import r2 from '/r2.jpg';
import r3 from '/r3.jpg';
import r4 from '/r4.jpg';
import r5 from '/r5.jpg';
import r6 from '/r6.jpg';

const ContractorInfo = () => {
  const [activeTab, setActiveTab] = useState('About the Contractor');

  const galleryImages = [r1, r2, r3, r4, r5, r6];

  // --- TAB 1: About Content ---
  const renderAbout = () => (
    <div className="tab-body-section animate-fade">
      <p className="bio-paragraph">
        At Apex Roofing Co., we bring over 12 years of roofing expertise to homeowners across Sydney. 
        Our team is fully licensed, insured, and known for our commitment to excellence—whether it's a 
        minor repair or a complete roof replacement.
      </p>

      <div className="licence-info-grid">
        <div className="licence-col">
          <label>Contractor Licence Number:</label>
          <span>NSW-ROOF-8823</span>
        </div>
        <div className="licence-col">
          <label>Trade Qualification:</label>
          <span>Certified Roof Plumbing & Construction</span>
        </div>
        <div className="licence-col">
          <label>  Liability Insurance:</label>
          <span>Yes</span>
        </div>
      </div>

      <h4 className="gallery-title">Project Gallery</h4>
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
  );

  // --- TAB 2: Reviews Content ---
  const renderReviews = () => {
    const reviews = [
      { id: 1, name: "Eunice J. Williams", img: "public/contractor1.jpg", text: "The team was punctual, professional, and finished the project before deadline. Everything was cleaned up nicely, and the new Colorbond roof looks great. Very happy with the outco..." },
      { id: 2, name: "Nancy N. Ellis", img: "public/contractor2.jpg", text: "Fantastic job overall. They followed the quote and maintained good workmanship. One small issue was the delay in removing scaffolding, but everything else was handled very..." },
      { id: 3, name: "James R. Okelly", img: "public/contractor2.jpg", text: "Work was well done and priced fairly. Only downside was that updates were slow during the middle of the job, but the end result was solid and as promised." },
      { id: 4, name: "Derek J. Youngquist", img: "public/contractor1.jpg", text: "Very smooth experience. The team communicated well, handled everything quickly, and showed us progress photos. Would definitely hire them again for future roofing or repair j..." }
    ];

    return (
      <div className="reviews-grid animate-fade">
        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-header">
              <img src={rev.img} alt="user" />
              <div className="review-user-info">
                <h4>{rev.name}</h4>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((s) => <RiStarFill key={s} size={12} color="#fa5a25" />)}
                  <span>4.7</span>
                </div>
              </div>
            </div>
            <p className="review-text">{rev.text}</p>
          </div>
        ))}
      </div>
    );
  };

  // --- TAB 3: Documents Content ---
  const renderDocuments = () => (
    <div className="documents-tab-grid animate-fade">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="doc-item-card">
          <div className="doc-icon-box">
             <img src="public/pdf_ic.png" alt="pdf" />
          </div>
          <div className="doc-meta">
            <h4>RooferCoinsurance.pdf</h4>
            <p>Liability Insurance</p>
          </div>
          <button className="doc-close-btn"><RiCloseCircleLine /></button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="white-card-box contractor-detail-card">
      {/* Profile Header */}
      <div className="contractor-top-header">
        <img src="public/contractor2.jpg" alt="Contractor" className="contractor-circle-img" />
        <div className="contractor-main-info">
          <div className="name-verified-row">
            <h3>Samantha Hollick</h3>
            
          </div>
          <div className="contractor-contacts">
            <span><RiCheckboxCircleFill color="rgba(250,90,37,1)" size={16} /> Verified Contractor</span>
            <span><RiMailFill color="rgba(250,90,37,1)" size={16} /> JasperCanning@dayrep.com</span>
            <span className="v-divider">|</span>
            <span><RiPhoneFill color="rgba(250,90,37,1)" size={16} /> 937-304-8161</span>
          </div>
        </div>
        <div className="contractor-rating-box">
          <RiStarFill size={16} color="#fa5a25" />
          <span>4.7 (128 reviews)</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="custom-tabs-nav">
        {['About the Contractor', "Client's Reviews", 'Documents'].map((tab) => (
          <button 
            key={tab} 
            className={activeTab === tab ? 'tab-btn-item active' : 'tab-btn-item'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Content Rendering */}
      <div className="dynamic-tab-container">
        {activeTab === 'About the Contractor' && renderAbout()}
        {activeTab === "Client's Reviews" && renderReviews()}
        {activeTab === 'Documents' && renderDocuments()}
      </div>
    </div>
  );
};

export default ContractorInfo;