import React from 'react'

const ServiceInstruction = () => {
  return (
    <section className='si-section'>
      <div className='si-container'>
        <div className='si-map-wrapper'>
          {/* Ensure path to your map image is correct */}
          <img src='/service-map.png' alt='Bondi Area Map' className='si-map-img' />
        </div>

        <div className='si-header'>
          <h1>Need help outside Bondi?</h1>
          <p>We’ve made the process simple, fast, and fully transparent—from start to finish.</p>
        </div>

        <div className='si-cards-grid'>
          <div className='si-card'>Tamarama</div>
          <div className='si-card'>Bronte</div>
          <div className='si-card'>North Bondi</div>
        </div>
      </div>
    </section>
  )
}

export default ServiceInstruction