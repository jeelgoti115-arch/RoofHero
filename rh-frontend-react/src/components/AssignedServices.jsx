import React from 'react'

const AssignedServices = () => {
  const services = [
    {
      title: "Roof Replacement in Bondi",
      desc: "Upgrade to Colorbond Ultra or premium terracotta tiles that withstand Bondi’s sea breezes and add beach-side street appeal."
    },
    {
      title: "Roof Repair in Bondi",
      desc: "Fast leak diagnosis, cracked-tile swaps and ridge-capping repoints delivered within 48 hrs of booking."
    },
    {
      title: "Guttering in Bondi",
      desc: "Marine-grade aluminium and stainless-steel gutter systems that resist salt corrosion and handle heavy coastal downpours."
    }
  ];

  return (
    <section className='assigned-section'>
      <div className='as-header'>
        <h1>Assigned Services</h1>
        <p>We’ve made the process simple, fast, and fully transparent—from start to finish.</p>
      </div>

      <div className='as-grid-container'>
        {services.map((service, index) => (
          <div className='as-card' key={index}>
            <div className='as-icon-box'>
              <img src='public/Vector.png' alt='check icon' />
            </div>
            <div className='as-card-content'>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AssignedServices