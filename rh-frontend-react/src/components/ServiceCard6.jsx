import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard6 = ({ onNext }) => {
  const [selectedLevel, setSelectedLevel] = useState('Single Storey');

  const levels = [
    { name: 'Single Storey', img: 'public/single-storey.svg' },
    { name: 'Double Storey', img: 'public/double-storey.svg' },
    { name: 'Three or more storeys', img: 'public/triple-storey.svg' },
  ];

  return (
    <div className='sc6-full-page-wrapper'>
      <div className='sc6-card-container'>
        <div className='sc6-header'>
          <h1>How many levels does your home have?</h1>
          <p>This helps us understand the access and safety needs.</p>
        </div>

        <div className='sc6-options-grid'>
          {levels.map((level, index) => (
            <div 
              key={index} 
              className={`sc6-option-item ${selectedLevel === level.name ? 'active' : ''}`}
              onClick={() => setSelectedLevel(level.name)}
            >
              <div className='sc6-img-box'>
                <img src={level.img} alt={level.name} />
              </div>
              <p>{level.name}</p>
            </div>
          ))}
        </div>

        <div className='sc6-footer'>
          <button className='sc6-continue-btn' onClick={() => onNext({ storey: selectedLevel })}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard6