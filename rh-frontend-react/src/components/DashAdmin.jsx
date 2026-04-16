import React, { useState, useEffect } from 'react';
import { 
  RiArrowRightUpLine, 
  RiArrowLeftSLine, 
  RiArrowRightSLine,
  RiArrowLeftLine,
  RiDownload2Line,
  RiArrowUpSLine,
  RiArrowDownSLine,
} from '@remixicon/react';
// import { 
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
//   ResponsiveContainer, BarChart, Bar 
// } from 'recharts';

// // --- MOCK DATA ---
// const jobLeadsData = [
//   { name: 'Jan', value: 15 }, { name: 'Feb', value: 25 }, { name: 'Mar', value: 18 },
//   { name: 'Apr', value: 70 }, { name: 'May', value: 35 }, { name: 'Jun', value: 50 },
//   { name: 'Jul', value: 45 }, { name: 'Aug', value: 40 }, { name: 'Sep', value: 95 },
//   { name: 'Oct', value: 25 }, { name: 'Nov', value: 65 }, { name: 'Dec', value: 60 },
// ];

// const contractorsData = [
//   { name: 'Jan', value: 35 }, { name: 'Feb', value: 25 }, { name: 'Mar', value: 18 },
//   { name: 'Apr', value: 45 }, { name: 'May', value: 75 }, { name: 'Jun', value: 30 },
//   { name: 'Jul', value: 50 }, { name: 'Aug', value: 15 }, { name: 'Sep', value: 40 },
//   { name: 'Oct', value: 75 }, { name: 'Nov', value: 30 }, { name: 'Dec', value: 35 },
// ];

// --- CUSTOM TOOLTIPS ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="da-custom-tooltip">
        <p className="da-tooltip-label">{`${label} 2024`}</p>
        <div className="da-tooltip-value">
          <span className="da-tooltip-dot"></span>
          <p>Job Leads : <strong>{payload[0].value}</strong></p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="da-custom-tooltip">
        <p className="da-tooltip-label">{`${label} 2024`}</p>
        <div className="da-tooltip-value">
          <span className="da-tooltip-dot da-dot-dark"></span>
          <p>Contractors : <strong>{payload[0].value * 4}</strong></p> 
        </div>
      </div>
    );
  }
  return null;
};

const DashAdmin = () => {
  // --- STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [contractorRequests, setContractorRequests] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState('document');
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [dashboardStats, setDashboardStats] = useState({
    totalContractors: 0,
    totalHomeowners: 0,
    completedProjects: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchContractorRequests = async () => {
    setLoadingRequests(true);
    setRequestError('');

    try {
      const response = await fetch('/api/admin/contractor-applications?status=pending');
      if (!response.ok) {
        throw new Error('Unable to load contractor requests.');
      }
      const data = await response.json();
      setContractorRequests(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      setRequestError('Unable to load contractor requests.');
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats');
      if (!response.ok) {
        throw new Error('Unable to load dashboard statistics.');
      }
      const data = await response.json();
      setDashboardStats({
        totalContractors: data.totalContractors ?? 0,
        totalHomeowners: data.totalHomeowners ?? 0,
        completedProjects: data.completedProjects ?? 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContractorRequests();
    fetchDashboardStats();
  }, [refreshKey]);

  const updateApplicationStatus = async (status) => {
    if (!selectedContractor?._id) return;

    try {
      const response = await fetch(`/api/admin/contractor-applications/${selectedContractor._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || 'Unable to update status');
      }

      await response.json();
      setSelectedContractor(null);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert('Unable to update contractor status.');
    }
  };

  const totalPages = Math.max(1, Math.ceil(contractorRequests.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = contractorRequests.slice(indexOfFirstItem, indexOfLastItem);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);
  if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) { pageNumbers.push(i); }

  // --- PROFILE VIEW ---
  if (selectedContractor) {
    return (
      <div className="da-main-content animate-fade">
        <div className="da-profile-header">
          <button className="da-back-btn" onClick={() => setSelectedContractor(null)}>
            <RiArrowLeftLine size={20} />
          </button>
          <h1 className="da-page-title" style={{margin: 0}}>Contractor Profile Request</h1>
        </div>

        <div className="da-profile-card">
          <h3 className="da-card-title">Contarctor Information</h3>
          
          <div className="da-personal-info-grid">
            <div className="da-avatar-section">
              <img
                src={selectedContractor.avatarUrl || '/dashboard1-profile.png'}
                alt="Profile"
                className="da-large-avatar"
              />
            </div>
            <div className="da-info-inputs">
              <div className="da-input-group">
                <label>Full Name</label>
                <input type="text" value={selectedContractor.fullName || selectedContractor.name || ''} readOnly />
              </div>
              <div className="da-input-group">
                <label>Mobile Number</label>
                <input type="text" value={selectedContractor.phone || selectedContractor.mobile || ''} readOnly />
              </div>
              <div className="da-input-group">
                <label>Email Address</label>
                <input type="text" value={selectedContractor.email || ''} readOnly />
              </div>
            </div>
          </div>

          <div className="da-bio-section">
            <label>Short Bio or Business Description</label>
            <textarea readOnly value={selectedContractor.bio || "No bio description provided."} />
          </div>

          <div className="da-accordion">
            {/* 1. DOCUMENT */}
            <div className={`da-accordion-item ${activeAccordion === 'document' ? 'open' : ''}`}>
              <div className="da-accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'document' ? '' : 'document')}>
                <span>Document</span>
                <div className={`da-acc-icon-circle ${activeAccordion === 'document' ? 'active' : ''}`}>
                    {activeAccordion === 'document' ? <RiArrowUpSLine size={20}/> : <RiArrowDownSLine size={20}/>}
                </div>
              </div>
              {activeAccordion === 'document' && (
                <div className="da-accordion-body">
                  <div className="da-doc-grid">
                    <div className="da-input-group">
                      <label>Roofing Licence Number</label>
                      <input type="text" value={selectedContractor.licenseNumber || ''} readOnly />
                    </div>
                    <div className="da-input-group">
                      <label>Insurance Policy Number</label>
                      <input type="text" value={selectedContractor.insurancePolicyNumber || selectedContractor.name || ''} readOnly />
                    </div>
                  </div>
                  <div className="da-upload-list">
                    <div className="da-file-preview">
                      {selectedContractor.licenseDocUrl ? (
                        <a
                          href={selectedContractor.licenseDocUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="da-file-link"
                        >
                          <span>{selectedContractor.licenseDocName || 'License document'}</span>
                        </a>
                      ) : (
                        <span>{selectedContractor.licenseDocName || 'No licence document uploaded'}</span>
                      )}
                      {selectedContractor.licenseDocUrl && (
                        <a
                          href={selectedContractor.licenseDocUrl}
                          download={selectedContractor.licenseDocName || undefined}
                          title="Download licence document"
                        >
                          <RiDownload2Line size={20} className="da-download-icon" />
                        </a>
                      )}
                    </div>
                    <div className="da-file-preview">
                      {selectedContractor.insuranceDocUrl ? (
                        <a
                          href={selectedContractor.insuranceDocUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="da-file-link"
                        >
                          <span>{selectedContractor.insuranceDocName || 'Insurance document'}</span>
                        </a>
                      ) : (
                        <span>{selectedContractor.insuranceDocName || 'No insurance document uploaded'}</span>
                      )}
                      {selectedContractor.insuranceDocUrl && (
                        <a
                          href={selectedContractor.insuranceDocUrl}
                          download={selectedContractor.insuranceDocName || undefined}
                          title="Download insurance document"
                        >
                          <RiDownload2Line size={20} className="da-download-icon" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. WORK PREFERENCES */}
            <div className={`da-accordion-item ${activeAccordion === 'work' ? 'open' : ''}`}>
              <div className="da-accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'work' ? '' : 'work')}>
                <span>Work Preferences</span>
                <div className={`da-acc-icon-circle ${activeAccordion === 'work' ? 'active' : ''}`}>
                    {activeAccordion === 'work' ? <RiArrowUpSLine size={20}/> : <RiArrowDownSLine size={20}/>}
                </div>
              </div>
              {activeAccordion === 'work' && (
                <div className="da-accordion-body">
                  <div className="da-doc-grid">
                     <div className="da-input-group">
                        <label>Suburbs or Regions Served</label>
                        <input type="text" value={(selectedContractor.regions || []).join(', ')} readOnly />
                     </div>
                     <div className="da-input-group">
                        <label>Years of Roofing Experience</label>
                        <input type="text" value={selectedContractor.experience || ''} readOnly />
                     </div>
                  </div>
                  <div className="da-services-offered">
                     <label className="da-label-bold">Roofing Services Offered</label>
                     <div className="da-checkbox-group">
                        {['Roof Replacements','Roof Repairs','Gutter Repairs','Skylight Installation','Roof Painting','Leak Inspections'].map((service) => (
                          <label key={service}>
                            <input type="checkbox" checked={(selectedContractor.services || []).includes(service)} readOnly /> {service}
                          </label>
                        ))}
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. PHOTOS */}
            <div className={`da-accordion-item ${activeAccordion === 'photos' ? 'open' : ''}`}>
              <div className="da-accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'photos' ? '' : 'photos')}>
                <span>Uploaded Past Work Photos</span>
                <div className={`da-acc-icon-circle ${activeAccordion === 'photos' ? 'active' : ''}`}>
                    {activeAccordion === 'photos' ? <RiArrowUpSLine size={20}/> : <RiArrowDownSLine size={20}/>}
                </div>
              </div>
              {activeAccordion === 'photos' && (
                <div className="da-accordion-body">
                  <label className="da-label-small">Gallery Photos (Front, Back Areas)</label>
                  <div className="da-photo-gallery">
                    {(selectedContractor.workPhotos || []).length > 0 ? (
                      selectedContractor.workPhotos.map((fileUrl, index) => (
                        <div className="da-photo-item" key={index}>
                          <img src={fileUrl} alt={`Work photo ${index + 1}`} />
                        </div>
                      ))
                    ) : (
                      <p className="da-text-dim">No work photos uploaded.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="da-confirmation-check">
              <input type="checkbox" required checked/>
              <label>I confirm that all information provided is accurate and I agree to the platform's terms and conditions.</label>
            </div>
          </div>

          <div className="da-profile-footer">
            <button className="da-btn-approve" onClick={() => updateApplicationStatus('approved')}>Approve Contractor <RiArrowRightUpLine size={18}/></button>
            <button className="da-btn-reject" onClick={() => updateApplicationStatus('rejected')}>Reject Application <RiArrowRightUpLine size={18}/></button>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="da-main-content animate-fade">
      <h1 className="da-page-title">Admin Dashboard</h1>

      <div className="da-stats-grid">
        <div className="da-stat-card">
          <div className="da-stat-icon-circle da-bg-orange"><img src="/roofers.png" alt="icon" /></div>
          <div className="da-stat-info">
            <label className="da-label-muted">Total Contractors</label>
            <h2 className="da-stat-number">{dashboardStats.totalContractors ?? 0}</h2>
          </div>
        </div>
        <div className="da-stat-card">
          <div className="da-stat-icon-circle da-bg-orange"><img src="/homeowners.png" alt="icon" /></div>
          <div className="da-stat-info">
            <label className="da-label-muted">Total Homeowners</label>
            <h2 className="da-stat-number">{dashboardStats.totalHomeowners ?? 0}</h2>
          </div>
        </div>
        <div className="da-stat-card">
          <div className="da-stat-icon-circle da-bg-orange"><img src="/completeprojects.png" alt="icon" /></div>
          <div className="da-stat-info">
            <label className="da-label-muted">Complete Projects</label>
            <h2 className="da-stat-number">{dashboardStats.completedProjects ?? 0}</h2>
          </div>
        </div>
      </div>

      {/* <div className="da-charts-container">
        <div className="da-chart-box">
          <h3 className="da-section-subtitle">Job Leads</h3>
          <div className="da-chart-visual">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={jobLeadsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fa5a25" stopOpacity={0.3}/><stop offset="95%" stopColor="#fa5a25" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#676767', fontSize: 12}} tickFormatter={(v) => `$${v}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#fa5a25', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="value" stroke="#fa5a25" strokeWidth={3} fill="url(#colorVal)" activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#fa5a25' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="da-chart-box">
          <h3 className="da-section-subtitle">Contractors</h3>
          <div className="da-chart-visual">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={contractorsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#676767', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} tickFormatter={(v) => `$${v}k`} />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#f9f9f9' }} />
                <Bar dataKey="value" fill="#122621" barSize={8} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div> */}

      <div className="da-table-section">
        <h3 className="da-section-subtitle">Contractor Onboarding Request</h3>
        <div className="da-table-card">
          {requestError && <div className="da-admin-error">{requestError}</div>}
          {loadingRequests ? (
            <div className="da-admin-loading">Loading contractor requests...</div>
          ) : (
            <>
              <table className="da-admin-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Mobile</th><th>Status</th><th>Submitted</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr><td colSpan={6} className="da-text-dim">No contractor onboarding requests found.</td></tr>
                  ) : currentData.map((row) => (
                    <tr key={row._id}>
                      <td className="da-text-dim">{row._id}</td>
                      <td className="da-font-bold">{row.fullName}</td>
                      <td>{row.phone}</td>
                      <td>{row.status}</td>
                      <td>{new Date(row.submittedAt).toLocaleDateString()}</td>
                      <td><button className="da-btn-view" onClick={() => setSelectedContractor(row)}>View Details <RiArrowRightUpLine size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="da-pagination">
                <button className="da-pagi-nav" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}><RiArrowLeftSLine/></button>
                {pageNumbers.map(n => <button key={n} className={`da-pagi-nav ${currentPage === n ? 'da-pagi-active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</button>)}
                <button className="da-pagi-nav" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}><RiArrowRightSLine/></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashAdmin;