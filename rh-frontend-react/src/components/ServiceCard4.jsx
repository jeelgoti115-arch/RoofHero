import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard4 = ({ onNext }) => {
  const [selectedPitch, setSelectedPitch] = useState('Low Pitch');

  const pitchOptions = [
    { name: 'Low Pitch', img: 'public/low-pitch.png' },
    { name: 'Normal', img: 'public/normal-pitch.png' },
    { name: 'Steep', img: 'public/steep-pitch.png' },
    { name: 'Flat', img: 'public/flat-pitch.png' },
  ];

  return (
    <div className='sc4-full-page-wrapper'>
      <div className='sc4-card-container'>
        <div className='sc4-header'>
          <h1>How steep is your roof?</h1>
          <p>Roof steepness affects installation and safety requirements.</p>
        </div>

        <div className='sc4-pitch-grid'>
          {pitchOptions.map((option, index) => (
            <div 
              key={index} 
              className={`sc4-pitch-item ${selectedPitch === option.name ? 'active' : ''} ${option.name === 'Flat' ? 'centered-item' : ''}`}
              onClick={() => setSelectedPitch(option.name)}
            >
              <div className='sc4-pitch-img'>
                <img src={option.img} alt={option.name} />
              </div>
              <p>{option.name}</p>
            </div>
          ))}
        </div>

        <div className='sc4-footer'>
          <button className='sc4-continue-btn' onClick={() => onNext({ steep: selectedPitch })}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard4