import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard3 = ({ onNext }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('Slate');

  const materials = [
    { name: 'Slate', img: '/slate.png' },
    { name: 'Concrete Tile', img: '/concrete.png' },
    { name: 'Premium', img: '/premium.png' },
    { name: 'Flat/ Membrane', img: '/flat.png' },
    { name: 'Metal', img: '/metal.png' },
    { name: 'Asphalt Shingle', img: '/asphalt.png' },
  ];

  return (
    <div className='sc2-wrapper'>
      <div className='sc2-card-container'>
        <div className='sc2-header'>
          <h1>What material would you like?</h1>
          <p> Choose your preferred material for a replacement or repair.</p>
        </div>

        <div className='sc2-grid'>
          {materials.map((item, index) => (
            <div 
              key={index} 
              className={`sc2-grid-item ${selectedMaterial === item.name ? 'active' : ''}`}
              onClick={() => setSelectedMaterial(item.name)}
            >
              <div className='sc2-img-box'>
                <img src={item.img} alt={item.name} />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        <div className='sc2-footer'>
          <button className='sc-continue-btn' onClick={() => onNext({ materialRequested: selectedMaterial })}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard3
