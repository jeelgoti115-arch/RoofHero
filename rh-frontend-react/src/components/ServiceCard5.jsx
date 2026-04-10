import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard5 = ({ onNext }) => {
  const [selectedComplexity, setSelectedComplexity] = useState('Simple (1-2 faces)');

  const options = [
    { name: 'Simple (1-2 faces)', img: 'public/simple-roof.png' },
    { name: 'Medium (3-4 faces, valleys)', img: 'public/medium-roof.png' },
    { name: 'Complex (5+ faces, hips/valleys/dormers)', img: 'public/complex-roof.png' },
  ];

  return (
    <div className='sc5-full-page-wrapper'>
      <div className='sc5-card-container'>
        <div className='sc5-header'>
          <h1>How complicated is your roof?</h1>
          <p>Let us know the roof’s shape—this affects pricing.</p>
        </div>

        <div className='sc5-options-grid'>
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`sc5-option-item ${selectedComplexity === option.name ? 'active' : ''}`}
              onClick={() => setSelectedComplexity(option.name)}
            >
              <div className='sc5-img-box'>
                <img src={option.img} alt={option.name} />
              </div>
              <p>{option.name}</p>
            </div>
          ))}
        </div>

        <div className='sc5-footer'>
          <button className='sc5-continue-btn' onClick={onNext}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard5