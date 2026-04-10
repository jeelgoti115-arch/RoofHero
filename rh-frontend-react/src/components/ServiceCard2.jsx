import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useState } from 'react'

const ServiceCard2 = ({ onNext }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('Asphalt Shingle');

  const materials = [
    { name: 'Slate', img: 'public/slate.png' },
    { name: 'Concrete Tile', img: 'public/concrete.png' },
    { name: 'Premium', img: 'public/premium.png' },
    { name: 'Flat/ Membrane', img: 'public/flat.png' },
    { name: 'Metal', img: 'public/metal.png' },
    { name: 'Asphalt Shingle', img: 'public/asphalt.png' },
  ];

  return (
    <div className='sc2-wrapper'>
      <div className='sc2-card-container'>
        <div className='sc2-header'>
          <h1>What is your current roof material?</h1>
          <p>Select the type of roof you have now.</p>
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
          <button className='sc-continue-btn' onClick={() => onNext({ currentRoofMaterial: selectedMaterial })}>
            Continue <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard2