// eslint-disable react-hooks/exhaustive-deps
import React, { useState, useMemo, useEffect } from 'react';
import { 
  RiArrowRightUpLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowLeftLine,
  RiMailLine, RiPhoneLine, RiArrowUpSLine, RiArrowDownSLine, RiInformationFill,
  RiCloseCircleLine,
  RiMailFill,
  RiPhoneFill
} from '@remixicon/react';

// --- SUB-COMPONENT: PROPOSAL DETAILS VIEW ---
const ProposalDetailsView = ({ item, onBack, onUpdateStatus }) => {
  const [expandedSection, setExpandedSection] = useState('basic');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderSidebar = () => {
    // IMAGE 1: New Inquiry Submission Form
    if (item.status === 'New Inquiry') {
      return (
        <div className="con-dash-sidebar-card animate-fade">
          <h2 className="con-dash-side-title">Quote Submission</h2>
          <div className="con-dash-form-group">
            <label>Final Quote Price ($AUD)</label>
            <input type="text" placeholder="e.g., 18,700" />
          </div>
          <div className="con-dash-form-row">
            <div className="con-dash-form-group">
              <label>Price Per Square</label>
              <input type="text" placeholder="$143.3" />
            </div>
            <div className="con-dash-form-group">
              <label>Estimated Start Date</label>
              <input type="date" />
            </div>
          </div>
          <div className="con-dash-form-group">
            <label>Custom Proposal Message</label>
            <textarea rows="6" placeholder="We'll handle tile removal and install..."></textarea>
          </div>
          <button className="con-dash-btn-submit" onClick={() => onUpdateStatus(item.id, 'Pending Review')}>
            Quotes Submit <RiArrowRightUpLine size={18} />
          </button>
          <div className="con-dash-info-box">
             <RiInformationFill size={18} color="#666" />
             <p>Once submitted, you cannot view or edit your bid. Homeowner will be notified.</p>
          </div>
        </div>
      );
    }

    // IMAGE 2: Pending Review or Accepted View
    if (item.status === 'Pending Review' || item.status === 'Accepted') {
      return (
        <div className="con-dash-sidebar-card animate-fade">
          <h2 className="con-dash-side-title">Quote Submission</h2>
          <div className="con-dash-readonly-group">
            <label>Final Quote Price ($AUD)</label>
            <p>$18,700 AUD</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Estimated Start Date</label>
            <p>May 10, 2025</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Custom Proposal Message</label>
            <p className="con-dash-msg-text">
              Thank you for considering us for your roofing project. We will carefully remove the existing tile roof and replace it with a new Colorbond metal roof, ensuring high-quality workmanship and full compliance with safety standards. Our team will also inspect the underlying structure and carry out any minor repairs if needed. We’ll maintain a clean worksite throughout and complete the job efficiently.
            </p>
            <p className="con-dash-msg-text">
              Please feel free to reach out if you have any questions. We look forward to working on your home.
            </p>
          </div>
          <div className={item.status === 'Accepted' ? 'jb-status-green-pill text-center w-full py-3 mt-4' : 'con-dash-status-indicator'}>
            {item.status === 'Accepted' ? 'Proposal Accepted' : 'Pending Homeowner Review'}
          </div>
        </div>
      );
    }

    if (item.status === 'Rejected') {
      return (
        <div className="con-dash-sidebar-card animate-fade">
          <h2 className="con-dash-side-title">Quote Submission</h2>
          <div className="con-dash-readonly-group">
            <label>Final Quote Price ($AUD)</label>
            <p>$18,700 AUD</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Estimated Start Date</label>
            <p>May 10, 2025</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Custom Proposal Message</label>
            <p className="con-dash-msg-text">
              Your bid was not selected. Better luck on the next opportunity.
            </p>
          </div>
          <div className="jb-status-red-pill">
            <p>Proposal Rejected</p>
          </div>
        </div>
      );
    }

    // IMAGE 3: Homeowner Details (Active Projects)
    return (
      <div className="con-dash-sidebar-card animate-fade">
        <h2 className="con-dash-side-title">Homeowner Details</h2>
        <div className="con-dash-owner-profile">
          <img src="public/toby.jpg" alt="owner" />
          <div>
              <h4>John Smith Roofing Co.</h4>
              <div className="con-dash-owner-contact">
                <RiMailFill size={14}  color='#fa5a25'/> john@roofsmith.com |
                <RiPhoneFill size={14} color='#fa5a25'/> +61 123 456 789
              </div>
          </div>
        </div>
        <div className="con-dash-owner-grid">
          <div><label>Status: </label><span className="jb-status-green-pill">approval by homeowner</span></div><br></br>
          <div className="mt-12"><label>Project Address:</label><p>Street 12 Smith St, Bondi, NSW 2026</p></div>
          <div className="mt-12">
          <label>Final Bid Amount: </label>
          <span className="con-dash-price-badge">AUD $18,500</span>
          </div>
        </div>
      </div>
    );


  };

  return (
    <div className="con-dash-details-view animate-fade">
      <div className="con-dash-details-header">
        <button onClick={onBack} className="con-dash-back-btn">
          <RiArrowLeftLine size={20} />
          <span>Proposal Details</span>
        </button>
      </div>

      <div className="con-dash-details-layout">
        <div className="con-dash-main-col">
          <div className="jb-card jb-p-24">
            <h2 className="con-dash-sec-title">Project Details</h2>
            <p className="con-dash-sub-sec">Account Manager Details</p>
            <div className="con-dash-profile-row">
              <img src="public/contractor2.jpg" alt="Mike" className="jb-avatar" />
              <div className="jb-profile-info">
                <h3>Mike Bullot</h3>
                <div className="jb-contact-row">
                  <span className="jb-contact-row-span" ><img src='public/mail_ic.png' alt='mail_ic' ></img>team@roofhero.au</span>
                  <span>|</span>
                  <span className="jb-contact-row-span"><img src='public/Call_ic.png' alt='call_ic' ></img>8565533446</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="con-dash-tag-open">{item.status}</div>
                <p className="jb-bids-count">12 Contractor Bids Received</p>
              </div>
            </div>

            <h2 className="con-dash-sec-title mt-24">Project Images</h2>
            <div className="con-dash-img-grid">
              <img src="public/r1.jpg" alt="roof" />
              <img src="public/r2.jpg" alt="roof" />
              <img src="public/r3.jpg" alt="roof" />
              <img src="public/r4.jpg" alt="roof" />
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
        <div className="con-dash-side-col">
          {renderSidebar()}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const DashContractor = () => {
  const [activeTab, setActiveTab] = useState('New Leads');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 5;

  const [allLeads, setAllLeads] = useState([
    { id: '#L1001', address: '21 Rosewood Ave, Parramatta, Sydney', date: '24 Apr 2025', area: '140 m²', quote: '$11,000 – $13,500', status: 'New Inquiry' },
    { id: '#L1002', address: '88 Clarence St, CBD, Sydney', date: '23 Apr 2025', area: '160 m²', quote: '$12,500 – $15,000', status: 'New Inquiry' },
    { id: '#L1003', address: '5 Kingsford Rd, Strathfield, Sydney', date: '22 Apr 2025', area: '100 m²', quote: '$9,000 – $11,000', status: 'New Inquiry' },
    { id: 'Q-1001', address: '21 Rosewood Ave, Parramatta, Sydney', date: '24 Apr 2025', area: '140 m²', quote: '$14,800', status: 'Pending Review' },
    { id: 'Q-1002', address: '88 Clarence St, CBD, Sydney', date: '23 Apr 2025', area: '160 m²', quote: '$18,200', status: 'Accepted' },
    { id: 'Q-1003', address: '5 Kingsford Rd, Strathfield, Sydney', date: '22 Apr 2025', area: '100 m²', quote: '$15,000', status: 'Rejected' },
    { id: 'Q-1004', address: '21 Rosewood Ave, Parramatta, Sydney', date: '24 Apr 2025', area: '140 m²', quote: '$14,800', status: 'In Progress' },
    { id: 'Q-1005', address: '88 Clarence St, CBD, Sydney', date: '23 Apr 2025', area: '160 m²', quote: '$18,200', status: 'Site Inspection Scheduled' },
    { id: 'Q-1006', address: '5 Kingsford Rd, Strathfield, Sydney', date: '22 Apr 2025', area: '100 m²', quote: '$15,000', status: 'Materials Ordered' },
  ]);

  // Dynamic Stats Calculation
  //const bidsCount = allLeads.filter(l => l.status !== 'New Inquiry').length;
  //const jobsCount = allLeads.filter(l => ['Accepted', 'In Progress', 'Site Inspection Scheduled', 'Materials Ordered'].includes(l.status)).length;
  const bidsCount = 12;
  const jobsCount = 4;
  const winRate = bidsCount > 0 ? Math.round((jobsCount * 100) / bidsCount) : 0;

  const stats = [
    { title: 'Bids Submitted', value: bidsCount.toString().padStart(2, '0'), img: 'public/fact_check_ic.svg', color: '#Fa5a25' },
    { title: 'Jobs Awarded', value: jobsCount.toString().padStart(2, '0'), img: 'public/roofers.png', color: '#Fa5a25' },
    { title: 'Win Rate', value: `${winRate}%`, img: 'public/trophy_ic.svg', color: '#Fa5a25' },
  ];

  const handleUpdateStatus = (id, newStatus) => {
    setAllLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    setSelectedItem(null);
  };

  const filteredData = useMemo(() => {
    return allLeads.filter(item => {
      if (activeTab === 'New Leads') return item.status === 'New Inquiry';
      if (activeTab === 'Submitted Quotes') return ['Pending Review', 'Accepted', 'Rejected'].includes(item.status);
      if (activeTab === 'Active Projects') return ['In Progress', 'Site Inspection Scheduled', 'Materials Ordered'].includes(item.status);
      return true;
    });
  }, [activeTab, allLeads]);

  useEffect(() => { setCurrentPage(1); }, [activeTab]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 0) return [1];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);
    if (end - start < 2) start = Math.max(1, end - 2);
    for (let i = start; i <= end; i++) if (i > 0) pages.push(i);
    return pages;
  };

  const getStatusClass = (status) => {
    const s = status.toLowerCase();
    if (s.includes('new') || s.includes('accepted') || s.includes('progress') || s.includes('scheduled') || s.includes('ordered') || s.includes('review')) return 'jb-status-green';
    if (s.includes('rejected')) return 'jb-status-red';
    return '';
  };

  if (selectedItem) {
    return <ProposalDetailsView item={selectedItem} onBack={() => setSelectedItem(null)} onUpdateStatus={handleUpdateStatus} />;
  }

  return (
    <div className="con-dash-container animate-fade">
      <h1 className="page-title">Contractor Dashboard</h1>
      {/* Stats Section */}
      <div className="con-dash-stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="con-dash-stat-card">
            <div className="con-dash-stat-img" style={{ backgroundColor: stat.color }}>
              <img src={stat.img} alt={stat.title} />
            </div>
            <div className="con-dash-stat-content">
              <p className="con-dash-stat-title">{stat.title}</p>
              <h2 className="con-dash-stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Card */}
      <div className="con-dash-main-card">
        <div className="con-dash-tabs">
          {['New Leads', 'Submitted Quotes', 'Active Projects'].map((tab) => (
            <button key={tab} className={`con-dash-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div className="con-dash-table-wrapper">
          <table className="con-dash-table">
            <thead>
              <tr>
                <th>{activeTab === 'New Leads' ? 'Lead ID' : 'Quote ID'}</th>
                <th>Property Address</th>
                <th>{activeTab === 'New Leads' ? 'Date Received' : 'Date Submitted'}</th>
                <th>Roof Area</th>
                <th>{activeTab === 'New Leads' ? 'Quote Range Provided' : 'Submitted Quote ($)'}</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((item, index) => (
                <tr key={index}>
                  <td className="text-dim">{item.id}</td>
                  <td className="font-bold">{item.address}</td>
                  <td>{item.date}</td>
                  <td>{item.area}</td>
                  <td>{item.quote}</td>
                  <td><span className={`con-dash-status-pill ${getStatusClass(item.status)}`}>{item.status}</span></td>
                  <td>
                    <button className="con-dash-btn-action" onClick={() => setSelectedItem(item)}>
                      {item.status === 'New Inquiry' ? 'View & Submit Quote' : 'View Details'} <RiArrowRightUpLine size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="con-dash-pagination">
          <button className="con-dash-pagi-arrow" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>
            <RiArrowLeftSLine size={20} />
          </button>
          {getPageNumbers().map(n => (
            <button key={n} className={`da-pagi-nav ${currentPage === n ? 'da-pagi-active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</button>
          ))}
          <button className="con-dash-pagi-arrow" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages || 1))}>
            <RiArrowRightSLine size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashContractor;