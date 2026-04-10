import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard7 = ({ onNext }) => {
  const [selectedTimeline, setSelectedTimeline] = useState('As soon as possible');

  const options = [
    'As soon as possible',
    'Within the next month',
    'In 1–3 months',
    'Just budgeting for now'
  ];

  return (
    <div className='sc7-full-page-wrapper'>
      <div className='sc7-card-container'>
        <div className='sc7-header'>
          <h1>What’s your timeline?</h1>
          <p>Helps us prioritise your quote and schedule.</p>
        </div>

        <div className='sc7-options-grid'>
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`sc7-option-item ${selectedTimeline === option ? 'active' : ''} ${option === 'Just budgeting for now' ? 'centered-item' : ''}`}
              onClick={() => setSelectedTimeline(option)}
            >
              <p>{option}</p>
            </div>
          ))}
        </div>

        <div className='sc7-footer'>
          <button className='sc7-continue-btn' onClick={() => onNext({ timeline: selectedTimeline })}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard7