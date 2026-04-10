import React from 'react'

const ServiceHomeowners = () => {
  return (
    <section className='sho-section'>
      <div className='sho-container'>
        <div className='sho-left-box'>
          <img 
            src="public/Rectangle-56789.png" 
            alt="Roofing in Bondi" 
            className='sho-img' 
          />
        </div>

        <div className="sho-right-box">
          <div className="sho-header">
            <h2>Why Bondi Homeowners Choose RoofHero</h2>
          </div>
          
          <div className="sho-content">
            <p>
              Bondi’s salty sea air accelerates metal-roof corrosion and loosens tile pointing. 
              RoofHero and partners replaces or repairs more than 30 roofs a year in Bondi, 
              using salt-resistant Colorbond Steel and marine-grade fasteners to keep coastal 
              homes watertight.
            </p>
            
            <p className='sho-subheading'>Common Bondi roofing challenges:</p>
            
            <ul className='sho-list'>
              <li>Salt-spray rust on old galvanised iron</li>
              <li>Storm-driven leaks during summer squalls</li>
              <li>Heritage terraces needing council-approved terracotta tiles</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceHomeowners