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
  const [bidAmount, setBidAmount] = useState(item.serviceDetails?.quote || item.serviceDetails?.estimatedQuote || '')
  const [pricePerSquare, setPricePerSquare] = useState(item.serviceDetails?.pricePerSquare || '')
  const [estimatedStartDate, setEstimatedStartDate] = useState(item.serviceDetails?.estimatedStartDate || '')
  const [proposalMessage, setProposalMessage] = useState(item.serviceDetails?.proposalMessage || '')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [statusError, setStatusError] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(item.status || 'Accepted')

  const details = item.serviceDetails || {};

  const statusOptions = React.useMemo(() => {
    if (item.status === 'Accepted') return ['Accepted', 'Site Inspection Scheduled', 'Materials Ordered', 'Completed']
    if (item.status === 'Site Inspection Scheduled') return ['Site Inspection Scheduled', 'Materials Ordered', 'Completed']
    if (item.status === 'Materials Ordered') return ['Materials Ordered', 'Completed']
    return [item.status]
  }, [item.status])
  const homeownerName = item.homeowner || item.fullName || item.homeowner?.fullName || 'Homeowner';
  const homeownerEmail = item.homeowner?.email || item.email || 'No email';
  const homeownerPhone = item.homeowner?.phone || item.phone || 'No phone';
  const quotePrice = details.quote || details.estimatedQuote || item.quote || 'Pending';
  const startDate = details.estimatedStartDate || item.estimatedStartDate || 'Not available';
  const projectImages = details.roofImages?.length ? details.roofImages.slice(0, 4) : ['public/r1.jpg', 'public/r2.jpg', 'public/r3.jpg', 'public/r4.jpg'];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmitQuote = async () => {
    setSubmitError(null)
    setSubmitting(true)
    try {
      await onUpdateStatus(item.id, 'Pending Review', {
        quoteAmount: bidAmount,
        pricePerSquare,
        estimatedStartDate,
        proposalMessage,
      })
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit quote.')
    } finally {
      setSubmitting(false)
    }
  }

  const renderSidebar = () => {
    // IMAGE 1: New Inquiry Submission Form
    if (['New Arrival', 'New Inquiry'].includes(item.status)) {
      return (
        <div className="con-dash-sidebar-card animate-fade">
          <h2 className="con-dash-side-title">Quote Submission</h2>
          <div className="con-dash-form-group">
            <label>Final Quote Price ($AUD)</label>
            <input
              type="text"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="e.g., 18,700"
            />
          </div>
          <div className="con-dash-form-row">
            <div className="con-dash-form-group">
              <label>Price Per Square</label>
              <input
                type="text"
                value={pricePerSquare}
                onChange={(e) => setPricePerSquare(e.target.value)}
                placeholder="$143.3"
              />
            </div>
          </div>
          <div className="con-dash-form-row">
            <div className="con-dash-form-group">
              <label>Estimated Start Date</label>
              <input
                type="date"
                value={estimatedStartDate}
                onChange={(e) => setEstimatedStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="con-dash-form-group">
            <label>Custom Proposal Message</label>
            <textarea
              rows="6"
              value={proposalMessage}
              onChange={(e) => setProposalMessage(e.target.value)}
              placeholder="We'll handle tile removal and install..."
            />
          </div>
          {submitError && <div className="con-dash-error-text">{submitError}</div>}
          <button className="con-dash-btn-submit" onClick={handleSubmitQuote} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Quote'} <RiArrowRightUpLine size={18} />
          </button>
          <div className="con-dash-info-box">
             <RiInformationFill size={18} color="#666" />
             <p>Once submitted, you cannot view or edit your bid. Homeowner will be notified.</p>
          </div>
        </div>
      );
    }

    // IMAGE 2: Pending Review, Accepted, or Active Job Status View
    if (['Pending Review', 'Accepted', 'Site Inspection Scheduled', 'Materials Ordered', 'Completed'].includes(item.status)) {
      return (
        <div className="con-dash-sidebar-card animate-fade">
          <h2 className="con-dash-side-title">Quote Submission</h2>
          <div className="con-dash-readonly-group">
            <label>Final Quote Price ($AUD)</label>
            <p>{quotePrice !== 'Pending' ? `AUD ${quotePrice}` : 'Pending'}</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Estimated Start Date</label>
            <p>{startDate}</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Custom Proposal Message</label>
            <p className="con-dash-msg-text">
              {item.proposalMessage || details.proposalMessage || 'Thank you for considering us for your roofing project. We will carefully remove the existing tile roof and replace it with a new Colorbond metal roof, ensuring high-quality workmanship and full compliance with safety standards.'}
            </p>
          </div>
          {['Accepted', 'Site Inspection Scheduled', 'Materials Ordered'].includes(item.status) ? (
            <div className="con-dash-status-update">
              <div className="con-dash-form-group">
                <label>Project Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </div>
              {statusError && <div className="con-dash-error-text">{statusError}</div>}
              <button
                className="con-dash-btn-submit"
                onClick={async () => {
                  if (selectedStatus === item.status) return
                  setStatusError(null)
                  setStatusUpdating(true)
                  try {
                    await onUpdateStatus(item.id, selectedStatus)
                  } catch (error) {
                    setStatusError(error.message || 'Failed to update status.')
                  } finally {
                    setStatusUpdating(false)
                  }
                }}
                disabled={statusUpdating || selectedStatus === item.status}
              >
                {statusUpdating ? 'Updating...' : 'Update Status'} <RiArrowRightUpLine size={18} />
              </button>
            </div>
          ) : item.status === 'Completed' ? (
            <div className="jb-status-green-pill text-center w-full py-3 mt-4">
              Completed
            </div>
          ) : (
            <div className="con-dash-status-indicator">
              Pending Homeowner Review
            </div>
          )}
        </div>
      );
    }

    if (item.status === 'Rejected') {
      return (
        <div className="con-dash-sidebar-card animate-fade">
          <h2 className="con-dash-side-title">Quote Submission</h2>
          <div className="con-dash-readonly-group">
            <label>Final Quote Price ($AUD)</label>
            <p>{quotePrice !== 'Pending' ? `AUD ${quotePrice}` : 'Pending'}</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Estimated Start Date</label>
            <p>{startDate}</p>
          </div>
          <div className="con-dash-readonly-group">
            <label>Custom Proposal Message</label>
            <p className="con-dash-msg-text">
              {item.proposalMessage || details.proposalMessage || 'Your bid was not selected. Better luck on the next opportunity.'}
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
          <div><label>Status: </label><span className="jb-status-green-pill">{item.status}</span></div><br></br>
          <div className="mt-12"><label>Project Address:</label><p>{details.propertyAddress || details.address || 'Not specified'}</p></div>
          <div className="mt-12">
          <label>Final Bid Amount: </label>
          <span className="con-dash-price-badge">AUD {quotePrice}</span>
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
                <h3>{homeownerName}</h3>
                <div className="jb-contact-row">
                  <span className="jb-contact-row-span"><img src='public/mail_ic.png' alt='mail_ic' />{homeownerEmail}</span>
                  <span>|</span>
                  <span className="jb-contact-row-span"><img src='public/Call_ic.png' alt='call_ic' />{homeownerPhone}</span>
                </div>
              </div>
              <div className="jb-status-container">
                <div className="con-dash-tag-open">{item.status}</div>
                <p className="jb-bids-count">{item.serviceDetails?.contractorBids || '12'} Contractor Bids Received</p>
              </div>
            </div>

            <h2 className="con-dash-sec-title mt-24">Project Images</h2>
            <div className="con-dash-img-grid">
              {projectImages.map((src, index) => <img key={index} src={src} alt={`roof-${index}`} />)}
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
                    <div><label>Project ID:</label><p>{item.id || item._id || 'Unknown'}</p></div>
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
                    <div><label>Automated Quoting:</label><p>{details.quoteRange || details.quote || details.estimatedQuote || '$8,000 — $9,500 AUD'}</p></div>
                    <div><label>Provide by:</label><p>{details.quoteProvider || 'roofhero'}</p></div>
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
  const [allLeads, setAllLeads] = useState([]);
  const [contractorInfo, setContractorInfo] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = window.localStorage.getItem('roofheroToken');
      if (!token) {
        setLoadingDashboard(false);
        return;
      }

      try {
        const response = await fetch('/api/contractors/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setLoadingDashboard(false);
          return;
        }

        const data = await response.json();
        setContractorInfo(data);

        if (Array.isArray(data.assignedQuotes) && data.assignedQuotes.length > 0) {
          const assignedLeads = data.assignedQuotes.map((quote) => {
            const status = quote.contractorStatus || quote.status || 'New Arrival'
            const hasSubmittedBid = Boolean(
              quote.serviceDetails?.quote ||
              quote.serviceDetails?.pricePerSquare ||
              ['Pending Review', 'Accepted', 'Rejected', 'Site Inspection Scheduled', 'Materials Ordered', 'Completed'].includes(status)
            )

            return {
              ...quote,
              id: quote._id,
              address: quote.serviceDetails?.propertyAddress || quote.serviceDetails?.address || 'Not specified',
              date: quote.requestedAt ? new Date(quote.requestedAt).toLocaleDateString() : 'Unknown',
              area: quote.serviceDetails?.roofArea || quote.serviceDetails?.approxRoofArea || 'Not specified',
              quote: quote.serviceDetails?.quote || quote.serviceDetails?.estimatedQuote || 'Pending',
              status,
              hasSubmittedBid,
              homeowner: quote.fullName || quote.homeowner?.fullName || 'Homeowner',
            }
          })
          setAllLeads(assignedLeads)
        } else if (data.dashboard) {
          setAllLeads([
            ...(data.dashboard.newLeads || []),
            ...(data.dashboard.submittedQuotes || []),
            ...(data.dashboard.activeProjects || []),
          ]);
        }
      } catch (error) {
        console.error('Failed to load contractor dashboard', error);
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboard();
  }, []);

  const bidsCount = allLeads.filter((item) => item.hasSubmittedBid).length;
  const jobsCount = allLeads.filter((item) => item.status === 'Accepted').length;
  const winRate = bidsCount > 0 ? Math.round((jobsCount * 100) / bidsCount) : 0;

  const stats = [
    { title: 'Bids Submitted', value: bidsCount.toString().padStart(2, '0'), img: 'public/fact_check_ic.svg', color: '#Fa5a25' },
    { title: 'Jobs Awarded', value: jobsCount.toString().padStart(2, '0'), img: 'public/roofers.png', color: '#Fa5a25' },
    { title: 'Win Rate', value: `${winRate}%`, img: 'public/trophy_ic.svg', color: '#Fa5a25' },
  ];

  const handleUpdateStatus = async (id, newStatus, payload = {}) => {
    const token = window.localStorage.getItem('roofheroToken')
    if (!token) {
      throw new Error('Authentication required.')
    }

    if (newStatus === 'Pending Review') {
      const response = await fetch(`/api/contractors/quote-requests/${id}/submit-quote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to submit quote.')
      }

      const { quote: updatedQuote } = await response.json()
      setAllLeads(prev => prev.map(l => l.id === id ? {
        ...l,
        status: newStatus,
        quote: updatedQuote.serviceDetails?.quote || updatedQuote.serviceDetails?.estimatedQuote || l.quote,
        serviceDetails: updatedQuote.serviceDetails || l.serviceDetails,
      } : l))
    } else {
      const response = await fetch(`/api/contractors/quote-requests/${id}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to update status.')
      }

      const { quote: updatedQuote } = await response.json()
      setAllLeads(prev => prev.map(l => l.id === id ? ({
        ...l,
        status: newStatus,
        serviceDetails: updatedQuote.serviceDetails || l.serviceDetails,
      }) : l))
    }

    setSelectedItem(null)
  };

  const filteredData = useMemo(() => {
    return allLeads.filter(item => {
      if (activeTab === 'New Leads') return ['New Arrival', 'Bidding In Progress'].includes(item.status);
      if (activeTab === 'Submitted Quotes') return ['Pending Review', 'Accepted', 'Rejected'].includes(item.status);
      if (activeTab === 'Active Projects') return ['In Progress', 'Site Inspection Scheduled', 'Materials Ordered', 'Completed'].includes(item.status);
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
    if (s.includes('new') || s.includes('accepted') || s.includes('progress') || s.includes('scheduled') || s.includes('ordered') || s.includes('review') || s.includes('bidding')) return 'jb-status-green';
    if (s.includes('rejected')) return 'jb-status-red';
    return '';
  };

  if (selectedItem) {
    return <ProposalDetailsView item={selectedItem} onBack={() => setSelectedItem(null)} onUpdateStatus={handleUpdateStatus} />;
  }

  if (loadingDashboard) {
    return (
      <div className="con-dash-container animate-fade">
        <h1 className="page-title">Loading Contractor Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="con-dash-container animate-fade">
      <div className="con-dash-header-row">
        <div>
          <h1 className="page-title">Contractor Dashboard</h1>
          {contractorInfo?.name && <p className="con-dash-subtitle">Welcome back, {contractorInfo.name}</p>}
        </div>
      </div>
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
                      {['New Inquiry', 'New Arrival'].includes(item.status) ? 'View & Submit Quote' : 'View Details'} <RiArrowRightUpLine size={20} />
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