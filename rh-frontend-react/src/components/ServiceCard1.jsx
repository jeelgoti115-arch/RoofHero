import { RiArrowRightUpLine, RiCheckFill } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard1 = ({ onNext }) => {
  const [selected, setSelected] = useState('replacement');

  return (
    <div className='sc-wrapper'>
      <div className='sc1-card-floating'>
        <div className='sc1-card-inner'>
          <h2>Do you need a roof repair or a full replacement?</h2>
          <p className='sc1-subtitle'>Tell us what kind of service you need.</p>

          <div className='sc1-options-row'>
            <div 
              className={`sc1-option-box ${selected === 'replacement' ? 'active' : ''}`}
              onClick={() => setSelected('replacement')}
            >
              <div className='sc1-option-icon'>
                <img src='public/roof_replacement.svg' alt='replacement' />
              </div>
              <p>Roof Replacement</p>
            </div>

            <div 
              className={`sc1-option-box ${selected === 'repair' ? 'active' : ''}`}
              onClick={() => setSelected('repair')}
            >
              <div className='sc1-option-icon'>
                <img src='public/roof_repair.svg' alt='repair' />
              </div>
              <p>Roof Repair</p>
            </div>
          </div>
          <button className='sc1-continue-btn' onClick={onNext}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard1