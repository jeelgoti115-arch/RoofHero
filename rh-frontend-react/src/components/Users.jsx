import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  RiSearchLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowRightUpLine,
  RiArrowLeftLine, RiMailLine, RiPhoneLine, RiDeleteBin7Line,
  RiFileTextLine, RiCloseCircleLine, RiDeleteBin6Fill, RiArrowDownSLine
} from '@remixicon/react';


// --- SUB-SUB-COMPONENT: PROJECT EDIT VIEW ---
const ProjectEditView = ({ project, onCancel }) => {
  return (
    <div className="adm-ho-edit-container animate-fade">
      <div className="adm-ho-details-header">
        <button onClick={onCancel} className="adm-ho-back-btn">
          <RiArrowLeftLine size={20} />
        </button>
        <h1 className="adm-ho-page-title">Homeowner Project Edit</h1>
      </div>

      <div className="adm-ho-content-card">
        {/* Section 1: Homeowner Information */}
        <h3 className="adm-ho-form-section-title">Homeowner Information</h3>
        <div className="adm-ho-edit-profile-row">
          <div className="adm-ho-avatar large">
            <img src="public/contractor2.jpg" alt="Profile" />
          </div>
          <div className="adm-ho-form-grid-3">
            <div className="adm-ho-input-group">
              <label>Full Name</label>
              <input type="text" defaultValue={project.name} placeholder="John Smith" />
            </div>
            <div className="adm-ho-input-group">
              <label>Mobile Number</label>
              <input type="text" defaultValue={project.mobile} placeholder="+61 400 123 456" />
            </div>
            <div className="adm-ho-input-group">
              <label>Email Address</label>
              <div className="adm-ho-select-wrapper">
                <select defaultValue={project.email}>
                  <option>{project.email}</option>
                </select>
                <RiArrowDownSLine className="select-icon" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Property Information */}
        <h3 className="adm-ho-form-section-title mt-8">Property Information</h3>
        <div className="adm-ho-form-grid-4">
          <div className="adm-ho-input-group">
            <label>Property Address</label>
            <input type="text" defaultValue={project.address} placeholder="e.g., 27 Rosebay Street..." />
          </div>
          <div className="adm-ho-input-group">
            <label>Number of Stories</label>
            <div className="adm-ho-select-wrapper">
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <RiArrowDownSLine className="select-icon" size={18} />
            </div>
          </div>
          <div className="adm-ho-input-group">
            <label>Roof Type</label>
            <div className="adm-ho-select-wrapper">
              <select>
                <option>Slate</option>
                <option>Concrete Tile</option>
                <option>Premium</option>
                <option>Flat/ Membrane</option>
                <option>Metal</option>
                <option>Asphalt Shingle</option>
              </select>
              <RiArrowDownSLine className="select-icon" size={18} />
            </div>
          </div>
          <div className="adm-ho-input-group">
            <label>Approximate Roof Area (in m²)</label>
            <input type="text" placeholder="e.g., 180" />
          </div>
          <div className="adm-ho-input-group">
            <label>Roof Pitch Type</label>
            <div className="adm-ho-select-wrapper">
              <select>
                <option>Low Pitch</option>
                <option>Normal</option>
                <option>Steep</option>
                <option>Flat</option>
              </select>
              <RiArrowDownSLine className="select-icon" size={18} />
            </div>
          </div>
          <div className="adm-ho-input-group">
            <label>Access Difficulty</label>
            <div className="adm-ho-select-wrapper">
              <select>
                <option>Easy</option>
                <option>Moderate</option>
                <option>Hard</option>
                <option>Very Hard</option>
              </select>
              <RiArrowDownSLine className="select-icon" size={18} />
            </div>
          </div>
          <div className="adm-ho-input-group">
            <label>Preferred Material for Roof</label>
            <input type="text" placeholder="e.g., Colorbond" />
          </div>
          <div className="adm-ho-input-group">
            <label>Any existing damage or known issues?</label>
            <input type="text" placeholder="e.g., Water leak near the back gutter" />
          </div>
        </div>

        {/* Section 3: Homeowner Contact Details */}
        <h3 className="adm-ho-form-section-title mt-8">Homeowner Contact Details</h3>
        <div className="adm-ho-form-grid-3">
          <div className="adm-ho-input-group">
            <label>Full Name</label>
            <input type="text" placeholder="e.g., Sarah Walker" />
          </div>
          <div className="adm-ho-input-group">
            <label>Email Address</label>
            <input type="text" placeholder="e.g., sarah.walker@email.com" />
          </div>
          <div className="adm-ho-input-group">
            <label>Phone Number</label>
            <input type="text" placeholder="e.g., +61 400 123 456" />
          </div>
        </div>

        <div className="adm-ho-input-group mt-6">
          <label>Any Notes for Admin or Contractors</label>
          <textarea rows="4" placeholder="e.g., Would prefer roof painting after install is complete"></textarea>
        </div>

        {/* Form Actions */}
        <div className="adm-ho-form-actions">
          <button className="adm-ho-btn-upd-orange" onClick={onCancel}>
            Update <RiArrowRightUpLine size={18} />
          </button>
          <button className="adm-ho-btn-outline" onClick={onCancel}>
            Cancel <RiArrowRightUpLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: PROJECT DETAILS VIEW ---
const ProjectDetailsView = ({ project, onBack }) => {
  // Added state for Tab switching
  const [activeTab, setActiveTab] = useState('property');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const docInputRef = useRef(null);

  const details = project.serviceDetails || {};
  const [projectImages, setProjectImages] = useState(() => {
  return details.roofImages?.length 
    ? details.roofImages 
    : ['public/r1.jpg', 'public/r2.jpg', 'public/r3.jpg', 'public/r4.jpg', 'public/r5.jpg'];
  });

  const [documents, setDocuments] = useState([
    { name: 'RooferCoinsurance.pdf', type: 'Public Liability Insurance' },
    { name: 'RooferCoinsurance.pdf', type: 'Public Liability Insurance' },
    { name: 'RooferCoinsurance.pdf', type: 'Public Liability Insurance' }
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => [...prev, { name: file.name, type: 'Uploaded Document' }]);
    }
  };

  if (isEditing) {
    return <ProjectEditView project={project} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="adm-ho-details-container animate-fade">
      {/* Header with Back Button */}
      <div className="adm-ho-details-header">
        <button onClick={onBack} className="adm-ho-back-btn">
          <RiArrowLeftLine size={20} />
        </button>
        <h1 className="adm-ho-page-title">Homeowner Project Details</h1>
      </div>

      <div className="adm-ho-content-card">
        {/* Profile Section */}
        <div className="adm-ho-profile-section">
          <div className="adm-ho-profile-info">
            <div className="adm-ho-avatar">
              <img src="public/user-image.png" alt="Profile" />
            </div>
            <div className="adm-ho-name-contact">
              <h2>{project.name || details.fullName || project.homeowner?.fullName || 'Homeowner'}</h2>
              <div className="adm-ho-contact-links">
                <span><img src='public/mail_ic.png' alt='mail-ic' /> {project.email || details.email || project.homeowner?.email || 'No email'}</span>
                <span><img src='public/Call_ic.png' alt='call-ic' /> {project.mobile || details.phone || project.homeowner?.phone || 'No phone'}</span>
              </div>
            </div>
          </div>
          <button className="adm-ho-btn-edit" onClick={() => setIsEditing(true)}>
            Homeowner Project Edit <RiArrowRightUpLine size={16} />
          </button>
        </div>

        {/* Tabs Section */}
        <div className="adm-ho-tabs">
          <button 
            className={`adm-ho-tab ${activeTab === 'property' ? 'active' : ''}`}
            onClick={() => setActiveTab('property')}
          >
            Property Information
          </button>
          <button 
            className={`adm-ho-tab ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        </div>

        {/* --- CONDITIONAL TAB CONTENT --- */}
        {activeTab === 'property' ? (
          <div className="animate-fade">
            <h3 className="adm-ho-address-title">{details.propertyAddress || details.address || 'No property address provided'}</h3>

            <div className="adm-ho-section-header">
              <h4>Project Images</h4>
              <button className="adm-ho-btn-upload" onClick={() => inputRef.current.click()}>Upload New Image <RiArrowRightUpLine size={16} /></button>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                ref={inputRef} 
                onChange={handleImageUpload} 
              />
            </div>
            
            <div className="adm-ho-image-grid">
                 {projectImages.map((src, i) => (
                   <div key={i} className="adm-ho-image-card">
                     <img src={src} alt='image-card' />
                     <button className="adm-ho-img-delete" onClick={() => setProjectImages(prev => prev.filter((_, idx) => idx !== i))}><RiDeleteBin6Fill size={14} /></button>
                   </div>
                 ))}
            </div>

            <div className="adm-ho-info-grid">
              <div><label>Project ID:</label><p>{project.id}</p></div>
              <div><label>Property Address:</label><p>{details.propertyAddress || details.address || 'Not provided'}</p></div>
              <div><label>Service Type:</label><p>{details.serviceType || details.serviceRequested || 'Not provided'}</p></div>
              <div><label>Current Roof Material:</label><p>{details.currentRoofMaterial || details.currentMaterial || details.currentRoof || 'Not provided'}</p></div>
              <div><label>Material Requested:</label><p>{details.materialRequested || details.requestedMaterial || 'Not provided'}</p></div>
              <div><label>Roof Faces:</label><p>{details.roofFaces || details.faces || 'Not provided'}</p></div>
            </div>

            <div className="adm-ho-info-grid mt-4">
                <div>
                    <label>Pitch Type:</label>
                    <p>{details.roofPitchType || details.steep || details.roofSlope || 'Not provided'}</p>
                </div>
                <div>
                    <label>Storey:</label>
                    <p>{details.stories || details.storey || details.story || 'Not provided'}</p>
                </div>
                <div>
                    <label>Approx. Roof Area:</label>
                    <p>{details.roofArea || details.approxRoofArea || 'Not provided'}</p>
                </div>
                <div>
                    <label>Timeline:</label>
                    <p>{details.timeline || details.timeLine || 'Not provided'}</p>
                </div>
            </div>

            {details.notes && (
              <div className="adm-ho-info-grid mt-4">
                <div style={{ width: '100%' }}>
                  <label>Notes / Damage Details</label>
                  <p>{details.notes || details.issues || details.existingDamage || 'No notes provided'}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* --- DOCUMENTS VIEW --- */
          <div className="animate-fade">
            <div className="adm-ho-section-header" style={{ justifyContent: 'flex-end' }}>
              <button className="adm-ho-btn-orange-pill" onClick={() => docInputRef.current.click()}>
                Add Documents <RiArrowRightUpLine size={16} />
              </button>
              <input 
                type="file" 
                accept="application/pdf" 
                style={{ display: 'none' }} 
                ref={docInputRef} 
                onChange={handleDocumentUpload} 
              />
            </div>
            
            <div className="adm-ho-doc-grid">
              {documents.map((doc, i) => (
                <div key={i} className="adm-ho-doc-card">
                  <div className="adm-ho-doc-icon">
                    <RiFileTextLine size={20} color="#ff6b35" />
                  </div>
                  <div className="adm-ho-doc-info">
                    <span className="adm-ho-doc-name">{doc.name}</span>
                    <span className="adm-ho-doc-type">{doc.type}</span>
                  </div>
                  <button className="adm-ho-doc-remove" onClick={() => setDocuments(prev => prev.filter((_, idx) => idx !== i))}>
                    <RiCloseCircleLine size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Users = () => {
  // --- STATE ---
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuoteRequests = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('roofheroToken');
        const response = await fetch('/api/admin/quote-requests', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load quote requests');
        }

        const data = await response.json();
        const normalized = data.map((quote) => ({
          id: quote._id,
          name: quote.fullName || quote.homeowner?.fullName || 'Unknown',
          mobile: quote.phone || quote.homeowner?.phone || 'Unknown',
          email: quote.email || quote.homeowner?.email || 'Unknown',
          address: quote.serviceDetails?.propertyAddress || quote.serviceDetails?.address || 'Not provided',
          date: quote.requestedAt ? new Date(quote.requestedAt).toLocaleDateString() : 'Unknown',
          status: quote.status || 'Submitted',
          serviceDetails: quote.serviceDetails || {},
          homeowner: quote.homeowner || null,
        }));

        setQuoteRequests(normalized);
      } catch (err) {
        setError(err.message || 'Unable to fetch quote requests');
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteRequests();
  }, []);

  // --- LOGIC ---
  const filteredData = useMemo(() => {
    return quoteRequests.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [quoteRequests, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages === 0) return [1];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);
    for (let i = startPage; i <= endPage; i++) { if(i > 0) pageNumbers.push(i); }
    return pageNumbers;
  };

  if (selectedProject) {
    return <ProjectDetailsView project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="adm-ho-main-container animate-fade">
      <h1 className="adm-ho-page-title">Homeowners Request</h1>

      <div className="adm-ho-content-card">
        <div className="adm-ho-controls">
          <div className="adm-ho-entries">
            <span>Show</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
              className="adm-ho-dropdown"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="adm-ho-search-wrapper">
            <RiSearchLine size={18} className="adm-ho-search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              className="adm-ho-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="adm-ho-table-wrapper">
          {loading ? (
            <div className="adm-ho-loading">Loading homeowner quote requests...</div>
          ) : error ? (
            <div className="adm-ho-error">{error}</div>
          ) : (
            <table className="adm-ho-table">
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>Homeowner ID</th>
                  <th style={{ width: '15%' }}>Full Name</th>
                  <th style={{ width: '13%' }}>Mobile Number</th>
                  <th style={{ width: '18%' }}>Email</th>
                  <th style={{ width: 'auto' }}>Address</th>
                  <th style={{ width: '12%' }}>Request Date</th>
                  <th style={{ width: '10%' }}>Status</th>
                  <th style={{ width: '12%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="adm-ho-no-data">No quote requests found.</td>
                  </tr>
                ) : (
                  visibleData.map((user) => (
                    <tr key={user.id}>
                      <td className="adm-ho-text-dim">{user.id}</td>
                      <td className="adm-ho-font-bold">{user.name}</td>
                      <td>{user.mobile}</td>
                      <td>{user.email}</td>
                      <td className="adm-ho-address-cell">{user.address}</td>
                      <td>{user.date}</td>
                      <td><span className="adm-ho-pill-active">{user.status}</span></td>
                      <td>
                        <button 
                            className="adm-ho-btn-view"
                            onClick={() => setSelectedProject(user)}
                        >
                          View Details <RiArrowRightUpLine size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="adm-ho-pagination">
          <button className="adm-ho-pagi-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>
            <RiArrowLeftSLine size={20} />
          </button>
          {getPageNumbers().map(n => (
            <button 
              key={n} 
              className={`adm-ho-pagi-btn ${currentPage === n ? 'active' : ''}`}
              onClick={() => setCurrentPage(n)}
            >
              {n}
            </button>
          ))}
          <button className="adm-ho-pagi-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages || 1))}>
            <RiArrowRightSLine size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;