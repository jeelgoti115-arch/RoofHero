// eslint-disable react-hooks/exhaustive-deps 
import React, { useState } from 'react';
import { RiArrowRightUpLine, RiCloseCircleFill, RiUserLine } from '@remixicon/react';

const API_BASE = '/api';

const ContractorForm = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [licenseDoc, setLicenseDoc] = useState(null);
  const [insuranceDoc, setInsuranceDoc] = useState(null);
  const [workPhotos, setWorkPhotos] = useState([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [regions, setRegions] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Roof Replacements',
    'Roof Repairs',
    'Gutter Repairs',
    'Skylight Installation',
    'Roof Painting',
    'Leak Inspections',
  ];

  const handleProfileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setProfileImg(URL.createObjectURL(file));
    }
  };

  const handleDocChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleWorkPhotosChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setWorkPhotos((prev) => prev.concat(files));
    }
  };

  const removePhoto = (index) => {
    setWorkPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('bio', bio);
      formData.append('licenseNumber', licenseNumber);
      formData.append('experience', experience);
      formData.append('services', JSON.stringify(selectedServices));
      formData.append('regions', JSON.stringify(regions.split(',').map((item) => item.trim()).filter(Boolean)));
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      if (licenseDoc) {
        formData.append('licenseDoc', licenseDoc);
      }
      if (insuranceDoc) {
        formData.append('insuranceDoc', insuranceDoc);
      }
      
      workPhotos.forEach(({ file }) => {
        formData.append('workPhotos', file);
      });

      const response = await fetch(`${API_BASE}/contractors/apply`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || 'Unable to submit application.');
        return;
      }

      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setBio('');
      setLicenseNumber('');
      setRegions('');
      setExperience('');
      setSelectedServices([]);
      setAvatarFile(null);
      setProfileImg(null);
      setLicenseDoc(null);
      setInsuranceDoc(null);
      setWorkPhotos([]);
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-banner">
        <h1>Contractor Onboarding Form</h1>
        <p>We're reviewing your project details to match you with the right contractors. You'll receive your Project ID and secure login credentials via email shortly.</p>
      </div>

      <div className="form-container">
        <form className="onboarding-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3 className="section-title">Personal Information</h3>

            <div className="profile-upload">
              <label htmlFor="avatar-input" className="avatar-wrapper">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">
                    <RiUserLine size={40} color="#ccc" />
                    <span>Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  id="avatar-input"
                  accept="image/*"
                  onChange={handleProfileChange}
                  hidden
                />
              </label>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Jane Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="e.g., +61 400 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g., jane.smith@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group full-width">
              <label>Short Bio or Business Description</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='e.g., "I’ve worked as a licensed roofer for over 12 years, specializing in tile-to-metal conversions."'
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Roofing Licence Number</label>
                <input
                  type="text"
                  placeholder="e.g., NSW Lic #1234567C"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Upload Licence Document (PDF)</label>
                <label className="file-input-wrapper custom-file-cursor">
                  <span className="btn-file">Choose File</span>
                  <span className="file-name">{licenseDoc?.name || 'No file chosen'}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleDocChange(e, setLicenseDoc)}
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Insurance Policy Number</label>
                <input
                  type="text"
                  placeholder="e.g., GBE #9876543"
                />
              </div>
              <div className="input-group">
                <label>Upload Insurance Certificate (PDF)</label>
                <label className="file-input-wrapper custom-file-cursor">
                  <span className="btn-file">Choose File</span>
                  <span className="file-name">{insuranceDoc?.name || 'No file chosen'}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleDocChange(e, setInsuranceDoc)}
                    hidden
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">Work Preferences</h3>
            <div className="form-row">
              <div className="input-group flex-2">
                <label>Suburbs or Regions You Serve</label>
                <input
                  type="text"
                  placeholder="e.g., Bondi, Liverpool, Penrith"
                  value={regions}
                  onChange={(e) => setRegions(e.target.value)}
                />
              </div>
              <div className="input-group flex-1">
                <label>Years of Roofing Experience</label>
                <input
                  type="text"
                  placeholder="e.g., 10"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group full-width">
              <label>Roofing Services You Offer<span className="required">*</span></label>
              <div className="checkbox-grid">
                {serviceOptions.map((service) => (
                  <label key={service} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">Upload Past Work Photos</h3>
            <p className="section-subtitle">Gallery Photos (Front, Back Areas)</p>

            <div className="gallery-upload-wrapper">
              <label className="file-input-wrapper custom-upload custom-file-cursor">
                <span className="btn-orange-file">Choose Files</span>
                <span className="file-name">{workPhotos.length > 0 ? `${workPhotos.length} photos selected` : 'No photos chosen'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleWorkPhotosChange}
                  hidden
                />
              </label>
            </div>

            <div className="image-gallery">
              {workPhotos.map((photo, i) => (
                <div key={i} className="gallery-card animate-fade">
                  <img src={photo.preview} alt="Work" />
                  <RiCloseCircleFill
                    className="remove-img-icon"
                    size={20}
                    onClick={() => removePhoto(i)}
                  />
                </div>
              ))}
            </div>
          </section>

          {errorMessage && <div className="form-error">{errorMessage}</div>}

          <div className="form-footer">
            <label className="checkbox-item terms">
              <input type="checkbox" required />
              <span>I confirm that all information provided is accurate and I agree to the platform's terms and conditions.</span>
            </label>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Application'} <RiArrowRightUpLine size={20} />
            </button>
          </div>
        </form>

        {submitted && (
          <div className="submission-confirmation">
            <h3>Application Submitted</h3>
            <p>Your contractor onboarding form has been sent to the admin for review.</p>
            <p>You will receive your login credentials once your application is accepted.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractorForm;