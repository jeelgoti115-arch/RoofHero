import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  RiArrowRightUpLine, 
  RiDeleteBin6Fill, 
  RiUploadCloud2Line,
  RiCloseCircleLine,
  RiCameraFill,
  RiStarSFill,
  RiStarHalfSLine,
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiStarFill,
  RiSearchLine,
  RiCloseLine,
} from '@remixicon/react';

const CManagement = () => {
  // --- STATES ---
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('About the Contractor');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [contractorError, setContractorError] = useState('');
  const inputRef = useRef(null);
  const [galleryImages, setGalleryImages] = useState([1,2,3,4,5,6,7,8,9].map(i => `public/roofie${i}.jpg`)); 
  const [documents, setDocuments] = useState([
    { id: 1, name: 'RooferCoinsurance.pdf', desc: 'Public Liability Insurance' },
    { id: 2, name: 'WorkSafetyCertificate.pdf', desc: 'Contractor Safety Certificate' },
  ]);
  const docInputRef = useRef(null);
  const [editedData, setEditedData] = useState(null);
  const [servicesOffered, setServicesOffered] = useState([]); 
  
  // Review Logic States
  const [newReview, setNewReview] = useState({ name: '', text: '', photo: '/dashboard1-profile.png' });
  const [reviewList, setReviewList] = useState([]);

  // --- HANDLERS ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddReview = async () => {
    if (!newReview.text) return alert("Please enter a review message.");
    if (!selectedContractor) return alert('No contractor selected.')

    const reviewToAdd = {
      name: newReview.name || "Anonymous User",
      text: newReview.text,
      stars: rating || 5,
      photo: newReview.photo,
    };

    try {
      const response = await fetch(`/api/admin/users/${selectedContractor.mongoId}/reviews`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewToAdd),
      });

      if (!response.ok) {
        throw new Error('Unable to save review.')
      }

      const { reviews } = await response.json();
      setReviewList(reviews);
      setSelectedContractor(prev => ({ ...prev, reviews }));
    } catch (error) {
      console.error(error);
      alert('Failed to save review. Please try again.')
      return;
    }

    setIsModalOpen(false);
    setRating(0);
    setNewReview({ name: '', text: '', photo: '/dashboard1-profile.png' });
  };

  const handleDeleteReview = (indexToDelete) => {
    setReviewList(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF document.');
      return;
    }

    setDocuments(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(doc => doc.id)) + 1 : 1,
        name: file.name,
        desc: 'Uploaded document',
        file,
      },
    ]);
    e.target.value = null;
  };

  const handleDeleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleSaveEdit = () => {
    setContractors(prev => prev.map(c => 
      c.id === selectedContractor.id ? { ...c, ...editedData, servicesOffered } : c
    ));
    setSelectedContractor(prev => ({ ...prev, ...editedData, servicesOffered }));
    setIsEditing(false);
  };

  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    const fetchContractors = async () => {
      setLoadingContractors(true);
      setContractorError('');

      try {
        const response = await fetch('/api/admin/users?role=contractor&status=approved');
        if (!response.ok) {
          throw new Error('Unable to load approved contractors.');
        }
        const data = await response.json();
        setContractors(data.map((item) => ({
          mongoId: item._id,
          id: item.username || item._id,
          username: item.username || item._id,
          name: item.name || item.email,
          mobile: item.phone || '',
          email: item.email || '',
          suburbs: Array.isArray(item.regions) ? item.regions.join(', ') : item.regions || '',
          regions: item.regions || [],
          date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
          status: item.status === 'approved' ? 'Active' : item.status || 'Pending',
          license: item.licenseNumber || 'N/A',
          qualification: item.licenseNumber ? 'Licensed Roofer' : 'Roofing Contractor',
          bio: item.bio || 'No description provided.',
          servicesOffered: item.services || [],
          experience: item.experience || '',
          avatar: item.avatarUrl || '/dashboard1-profile.png',
          password: item.generatedPassword || item.password || '',
          workPhotos: item.workPhotos || [],
          reviews: item.reviews || [],
        })));
      } catch (error) {
        console.error(error);
        setContractorError(error.message || 'Unable to load contractor management data.');
      } finally {
        setLoadingContractors(false);
      }
    };

    fetchContractors();
  }, []);

  // --- SEARCH & PAGINATION LOGIC ---
  const { visibleContractors, totalPages, pageNumbers } = useMemo(() => {
    const filtered = contractors.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.suburbs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm)
    );

    const total = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const visible = filtered.slice(start, start + itemsPerPage);
    
    let sPage = Math.max(1, currentPage - 1);
    let ePage = Math.min(total, sPage + 2);
    if (ePage - sPage < 2) sPage = Math.max(1, ePage - 2);
    
    const nums = [];
    for (let i = sPage; i <= ePage; i++) { if (i > 0) nums.push(i); }
    
    return { visibleContractors: visible, totalPages: total, pageNumbers: nums };
  }, [currentPage, itemsPerPage, contractors, searchTerm]);

  // --- TAB RENDERERS ---
  const renderAboutTab = (data) => (
    <div className="da-cm-tab-pane animate-fade">
      <p className="da-cm-bio-text">{data.bio}</p>
      <h3 className="da-cm-section-subtitle">Licences & Insurance</h3>
      <div className="da-cm-licence-grid">
        <div className="da-cm-lic-item"><label>Contractor Licence Number:</label><span>{data.license || 'N/A'}</span></div>
        <div className="da-cm-lic-item"><label>Trade Qualification:</label><span>{data.qualification || 'N/A'}</span></div>
        <div className="da-cm-lic-item"><label>Public Liability Insurance:</label><span>Yes</span></div>
      </div>
      <div className="da-cm-gallery-header">
        <h3 className="da-cm-section-title">Project Gallery</h3>
        <button className="da-cm-btn-orange" onClick={() => inputRef.current.click()}>Upload Image <RiUploadCloud2Line size={18} /></button>
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={inputRef} 
          onChange={handleGalleryUpload} 
        />
      </div>
      <div className="da-cm-gallery-grid">
         {(data.workPhotos && data.workPhotos.length > 0 ? data.workPhotos : galleryImages).map((src, i) => (
            <div key={i} className="da-cm-gallery-item">
                <img src={src} alt='work' />
                <button className="da-cm-gallery-del" onClick={() => setGalleryImages(prev => prev.filter((_, idx) => idx !== i))}><RiDeleteBin6Fill /></button>
            </div>
         ))}
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="da-cm-tab-pane animate-fade">
      <div className="da-cm-tab-header">
        <button className="da-cm-btn-orange" onClick={() => setIsModalOpen(true)}>Add Contractor Reviews <RiArrowRightUpLine size={18} /></button>
      </div>
      <div className="da-cm-reviews-grid">
        {reviewList.length > 0 ? reviewList.map((rev, i) => (
          <div key={i} className="da-cm-review-card">
            <button className="da-cm-card-del" onClick={() => handleDeleteReview(i)}><RiCloseCircleLine /></button>
            <div className="da-cm-rev-user">
              <img src={rev.photo} alt="user" />
              <div>
                <h4>{rev.name}</h4>
                <div className="da-cm-stars">
                  <RiStarSFill size={14}/><RiStarSFill size={14}/><RiStarSFill size={14}/><RiStarSFill size={14}/><RiStarHalfSLine size={14} /> 
                  <span>{rev.stars}</span>
                </div>
              </div>
            </div>
            <p className="da-cm-rev-text">{rev.text}</p>
          </div>
        )) : (
          <div className="da-cm-empty-state">No reviews yet for this contractor.</div>
        )}
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="da-cm-tab-pane animate-fade">
      <div className="da-cm-tab-header">
        <button className="da-cm-btn-orange" onClick={() => docInputRef.current?.click()}>Add Documents <RiArrowRightUpLine size={18} /></button>
        <input
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          ref={docInputRef}
          onChange={handleDocumentUpload}
        />
      </div>
      <div className="da-cm-docs-list">
        {documents.map(doc => (
          <div key={doc.id} className="da-cm-doc-card">
             <button className="da-cm-card-del" onClick={() => handleDeleteDocument(doc.id)}><RiCloseCircleLine /></button>
             <div className="da-cm-doc-info">
               <div className="da-cm-pdf-icon">PDF</div>
               <div><h4>{doc.name}</h4><p>{doc.desc}</p></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- VIEW: EDIT PROFILE ---
  if (selectedContractor && isEditing) {
    return (
      <div className="da-cm-profile-container animate-fade">
        <div className="da-cm-profile-header">
          <button className="da-cm-back-btn" onClick={() => setIsEditing(false)}><RiArrowLeftLine size={20}/></button>
          <h1 className="da-cm-page-title" style={{margin:0}}>Contractor Profile Request</h1>
        </div>
        <div className="da-cm-edit-card">
          <h3 className="da-cm-section-title">Personal Information</h3>
          <div className="da-cm-edit-personal-grid">
            <img src={editedData?.avatar || selectedContractor.avatar || '/dashboard1-profile.png'} alt="Edit" className="da-cm-edit-avatar" />
            <div className="da-cm-edit-inputs-grid">
              <div className="da-cm-edit-group"><label>Full Name</label><input type="text" value={editedData?.name || ''} onChange={(e) => setEditedData(prev => ({...prev, name: e.target.value}))} /></div>
              <div className="da-cm-edit-group"><label>Mobile Number</label><input type="text" value={editedData?.mobile || ''} onChange={(e) => setEditedData(prev => ({...prev, mobile: e.target.value}))} /></div>
              <div className="da-cm-edit-group"><label>Email Address</label><input type="text" value={editedData?.email || ''} onChange={(e) => setEditedData(prev => ({...prev, email: e.target.value}))} /></div>
            </div>
          </div>
          <div className="da-cm-edit-group" style={{marginTop:'20px'}}><label>Short Bio or Business Description</label><textarea rows="4" value={editedData?.bio || ''} onChange={(e) => setEditedData(prev => ({...prev, bio: e.target.value}))}></textarea></div>
          
          <h3 className="da-cm-section-title" style={{marginTop:'30px'}}>Work Preferences</h3>
          <div className="da-cm-work-grid">
            <div className="da-cm-edit-group">
              <label>Suburbs or Regions You Serve</label>
              <input type="text" value={editedData?.suburbs || ''} onChange={(e) => setEditedData(prev => ({...prev, suburbs: e.target.value}))} />
            </div>
            <div className="da-cm-edit-group">
              <label>Years of Roofing Experience</label>
              <input type="text" value={editedData?.experience || editedData?.yearsExperience || ''} onChange={(e) => setEditedData(prev => ({...prev, experience: e.target.value, yearsExperience: e.target.value}))} />
            </div>
          </div>
          <div className="da-cm-edit-services">
            <label className="da-cm-edit-label-bold">Roofing Services You Offer<span style={{color:'#ff5c28'}}>*</span></label>
            <div className="da-cm-edit-checkbox-group">
              {['Roof Replacements', 'Roof Repairs', 'Gutter Repairs', 'Skylight Installation', 'Roof Painting', 'Leak Inspections'].map(s => (
                <label key={s} className="da-cm-checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={servicesOffered.includes(s)} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setServicesOffered(prev => [...prev, s]);
                      } else {
                        setServicesOffered(prev => prev.filter(x => x !== s));
                      }
                    }} 
                  /> {s}
                </label>
              ))}
            </div>
          </div>
          <div className="da-cm-edit-actions">
            <button className="da-cm-btn-orange" onClick={handleSaveEdit}>Edit Profile <RiArrowRightUpLine size={18}/></button>
            <button className="da-cm-btn-cancel" onClick={() => setIsEditing(false)}>Cancel <RiArrowRightUpLine size={18}/></button>
          </div>
        </div>
        <div className="da-cm-edit-card" style={{marginTop:'25px'}}>
          <h3 className="da-cm-section-title">Login Credentials (Auto-Generated)</h3>
          <div className="da-cm-edit-inputs-grid">
            <div className="da-cm-edit-group"><label>Contractor ID</label><input type="text" readOnly defaultValue={selectedContractor.username || selectedContractor.id} /></div>
            <div className="da-cm-edit-group"><label>Email</label><input type="text" readOnly defaultValue={selectedContractor.email} /></div>
            <div className="da-cm-edit-group"><label>Password</label><input type="text" readOnly defaultValue={selectedContractor.password || 'Generated on approval'} /></div>
          </div>
          <button className="da-cm-btn-revoke">Revoke Contractor Access <RiArrowRightUpLine size={18}/></button>
        </div>
      </div>
    );
  }

  // --- VIEW: PROFILE DETAILS ---
  if (selectedContractor) {
    return (
      <div className="da-cm-profile-container animate-fade">
        {isModalOpen && (
          <div className="da-cm-modal-overlay">
            <div className="da-cm-modal-card animate-slide-up">
              <div className="da-cm-modal-header">
                <h3>Add Contractor Reviews</h3>
                <button className="da-cm-modal-close" onClick={() => setIsModalOpen(false)}>
                  <RiCloseLine size={24}/>
                </button>
              </div>

              <div className="da-cm-modal-body">
                <div className="da-cm-modal-photo-upload">
                  <label htmlFor="photo-input" className="da-cm-photo-preview" style={{ cursor: 'pointer' }}>
                    <img src={newReview.photo} alt="preview" />
                    <div className="da-cm-photo-badge"><RiCameraFill size={14}/></div>
                  </label>
                  <input 
                    type="file" 
                    id="photo-input" 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                  />
                  <p>Profile Photo Upload</p>
                </div>

                <div className="da-cm-star-rating">
                  {[1, 2, 3, 4, 5].map(s => (
                    <RiStarFill 
                      key={s} 
                      size={28} 
                      className={s <= rating ? 'star-active' : 'star-inactive'} 
                      onClick={() => setRating(s)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>

                <div className="da-cm-modal-input-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Reviewer Name"
                    value={newReview.name} 
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="da-cm-modal-input-group">
                  <label>Review Message</label>
                  <textarea 
                    placeholder="Write review here..." 
                    rows="4"
                    value={newReview.text}
                    onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                  ></textarea>
                </div>

                <button className="da-cm-btn-submit" onClick={handleAddReview}>
                  Add Reviews <RiArrowRightUpLine size={20}/>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="da-cm-profile-header">
          <button className="da-cm-back-btn" onClick={() => setSelectedContractor(null)}><RiArrowLeftLine size={20}/></button>
          <h1 className="da-cm-page-title" style={{margin:0}}>Contractor Profile</h1>
        </div>
        <div className="da-cm-profile-card">
          <div className="da-cm-prof-top">
            <div className="da-cm-prof-identity">
              <img src={selectedContractor.avatar || '/dashboard1-profile.png'} alt="Avatar" className="da-cm-prof-avatar" />
              <div className="da-cm-prof-name-block">
                <h2 className="da-cm-prof-name">{selectedContractor.name}</h2>
                <div className="da-cm-prof-sub-info">
                  <span className="da-cm-verified"><img src='/Vector.png' alt='v' /> Verified Contractor</span>
                  <span className="da-cm-verified"><img src='/mail_ic.png' alt='m' /> {selectedContractor.email}</span>
                  <span className="da-cm-verified"><img src='/Call_ic.png' alt='c' /> {selectedContractor.mobile}</span>
                </div>
              </div>
            </div>
            <button className="da-cm-btn-orange" onClick={() => {
              setEditedData({
                ...selectedContractor,
                yearsExperience: selectedContractor.experience || '',
                suburbs: selectedContractor.suburbs || '',
              });
              setServicesOffered(selectedContractor.servicesOffered || []);
              setIsEditing(true);
            }}>Edit Contractor Profile <RiArrowRightUpLine size={18}/></button>
          </div>
          <div className="da-cm-tabs">
            {['About the Contractor', 'Contractor Reviews', 'Documents'].map(tab => (
              <button key={tab} className={`da-cm-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
          <div className="da-cm-tab-content">
            {activeTab === 'About the Contractor' && renderAboutTab(selectedContractor)}
            {activeTab === 'Contractor Reviews' && renderReviewsTab()}
            {activeTab === 'Documents' && renderDocumentsTab()}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: TABLE ---
  return (
    <div className="da-cm-main-container animate-fade">
      <h1 className="da-cm-page-title">Contractor Management</h1>
      <div className="da-cm-content-card">
        <div className="da-cm-controls-row">
          <div className="da-cm-entries-select"><span>Show</span>
            <select className="da-cm-dropdown" value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
              <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option>
            </select>
          </div>
          <div className="da-cm-search-box">
            <RiSearchLine size={18} className="da-cm-search-icon"/>
            <input 
              type="text" 
              placeholder="Search" 
              className="da-cm-input" 
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
            />
          </div>
        </div>
        <div className="da-cm-table-wrapper">
          {loadingContractors && <div className="da-cm-loading">Loading approved contractors...</div>}
          {contractorError && <div className="da-cm-error">{contractorError}</div>}
          <table className="da-cm-table">
            <thead><tr><th>Contractor ID</th><th>Contractor Name</th><th>Mobile Number</th><th>Suburbs Covered</th><th>Date Approved</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {visibleContractors.length > 0 ? (
                visibleContractors.map((item, idx) => (
                  <tr key={idx}>
                    <td className="da-cm-id-text">{item.id}</td><td className="da-cm-name-text">{item.name}</td><td>{item.mobile}</td><td>{item.suburbs}</td><td>{item.date}</td>
                    <td><span className={item.status === 'Active' ? 'da-cm-pill-active' : 'da-cm-pill-pending'}>{item.status}</span></td>
                    <td><button className="da-cm-btn-action" onClick={() => { setSelectedContractor(item); setReviewList(item.reviews || []); }}>View Details <RiArrowRightUpLine size={16}/></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="7" style={{textAlign:'center', padding:'20px', color:'#666'}}>No contractors found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="da-cm-pagination-footer">
            <button className="da-cm-pagi-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}><RiArrowLeftSLine/></button>
            {pageNumbers.map(n => <button key={n} className={`da-cm-pagi-btn ${currentPage === n ? 'da-cm-pagi-active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</button>)}
            <button className="da-cm-pagi-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}><RiArrowRightSLine/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CManagement;