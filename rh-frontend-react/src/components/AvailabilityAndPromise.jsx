import { RiArrowRightUpLine } from '@remixicon/react'
import React from 'react'

const AvailabilityAndPromise = () => {
  return (
    <div>
      <section className='anp'>
      <div className='main-box-anp'>
        <div className='left-box-anp'>
          <p className='section-tag-anp'>
            
          </p>
          <h1>Local Availability & Service Promise</h1>
          <div className='text-content-anp'>
            <p className='left-anp'>
              30+ Bondi roofs completed since January 2024.
            </p>
            <p className='left-anp'>
              Local crew on-call 7 days; emergency leak repairs within 2 hours.
            </p>
          </div>
        </div>

        <div className='right-box-anp'>
          <div className='anp-right-div'>
            <div className='anp-right-div-text'>
              <h4>Get Roofing Quotes for Your Bondi Home</h4>
              <p>It takes 60 seconds. No calls, no obligations.</p>
            </div>
            <button className='cta-btn-anp'>
              Get Instant Estimate
              <RiArrowRightUpLine size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>

    </div>
  )
}

export default AvailabilityAndPromise
