import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = '/api';

const ServiceCard9 = ({ serviceDetails, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [roofImages, setRoofImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoofImagesChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4)
    setRoofImages(files)
  }

  const handleGetQuotes = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('serviceDetails', JSON.stringify({
        ...serviceDetails,
        propertyAddress,
      }))

      roofImages.forEach((file) => {
        formData.append('roofImages', file)
      })

      const response = await fetch(`${API_BASE}/homeowner/quote`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || 'Something went wrong.');
        return;
      }

      setCredentials(result.credentials);
      setIsSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setPropertyAddress('');
      setRoofImages([]);
      onSubmit({
        fullName,
        email,
        phone,
        serviceDetails: { ...serviceDetails, propertyAddress, roofImages: roofImages.map((file) => file.name) },
      });
    } catch (error) {
      setErrorMessage('Unable to submit quote request. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='sc9-full-page-wrapper'>
      <div className={`sc9-card-container ${isSubmitted ? 'blur-bg' : ''}`}>
        <div className='sc9-header'>
          <h1>Where should we send your Roof Report and Contractor Quotes?</h1>
          <p>Your data is safe — just tell us where to send your report</p>
        </div>

        <form className='sc9-form' onSubmit={handleGetQuotes}>
          <div className='sc9-input-row'>
            <div className='sc9-input-group'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                type='text'
                id='fullName'
                placeholder='e.g., Sarah Walker'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className='sc9-input-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                placeholder='e.g., sarah.walker@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='sc9-input-row'>
            <div className='sc9-input-group'>
              <label htmlFor='phone'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                placeholder='Enter 10 digit mobile number'
                pattern='[1-9]{10}'
                maxLength='10'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className='sc9-input-group'>
              <label htmlFor='propertyAddress'>Property Address</label>
              <input
                type='text'
                id='propertyAddress'
                placeholder='e.g., 27 Rosebay Street, Bondi NSW 2026'
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
              />
            </div>
          </div>

          <div className='sc9-input-row'>
            <div className='sc9-input-group'>
              <label htmlFor='roofImages'>Roof Images (up to 4)</label>
              <input
                type='file'
                id='roofImages'
                accept='image/*'
                multiple
                onChange={handleRoofImagesChange}
              />
              {roofImages.length > 0 && (
                <p className='image-count'>Selected {roofImages.length} image(s)</p>
              )}
            </div>
          </div>

          {errorMessage && <p className='form-error'>{errorMessage}</p>}

          <div className='sc9-footer'>
            <button type='submit' className='sc9-submit-btn' disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Get My Quotes'} <RiArrowRightUpLine size={20} />
            </button>
          </div>
        </form>
      </div>

      {isSubmitted && (
        <div className='sc9-success-overlay'>
          <div className='sc9-success-modal'>
            <div className='success-icon-container'>
              <img src='public/success-envelope.svg' alt='Success Icon' className='success-icon' />
            </div>

            <h2>Quote Submitted</h2>
            <p>Your quote request is submitted successfully.</p>
            {credentials && (
              <div className='credentials-box'>
                <p><strong>User ID:</strong> {credentials.username}</p>
                <p><strong>Password:</strong> {credentials.password}</p>
                <p>Use these credentials to log in and view your submitted quote.</p>
              </div>
            )}

            <button className='return-home-btn' onClick={() => navigate('/homeowner')}>
              Return to Home <RiArrowRightUpLine size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceCard9