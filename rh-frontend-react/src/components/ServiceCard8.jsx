import { RiArrowRightUpLine, RiCheckFill } from '@remixicon/react'
import React from 'react'

const ServiceCard8 = ({ onNext }) => {
  return (
    <div className='sc8-full-page-wrapper'>
      <div className='sc8-card-container'>
        <div className='sc8-header'>
          <h1>Your Roof, Matched with Top Local Roofers</h1>
          <p className='sc8-main-desc'>
            RoofHero packages your roofing details into a professional report, 
            making it easy for trusted local contractors to provide competitive quotes.
          </p>
        </div>

        <div className='sc8-summary-title'>
          <h3>Summary of how RoofHero works</h3>
          <p>Multiple quotes from vetted local contractors</p>
        </div>

        <div className='sc8-badges-grid'>
          <div className='sc8-badge-item'>
            <div className='sc8-icon-circle'><RiCheckFill size={18} /></div>
            <p>Multiple quotes from vetted local contractors</p>
          </div>
          <div className='sc8-badge-item'>
            <div className='sc8-icon-circle'><RiCheckFill size={18} /></div>
            <p>Clear comparisons on price, qualifications, and reviews</p>
          </div>
          <div className='sc8-badge-item'>
            <div className='sc8-icon-circle'><RiCheckFill size={18} /></div>
            <p>Choose confidently — no obligations, no hassle</p>
          </div>
          <div className='sc8-badge-item'>
            <div className='sc8-icon-circle'><RiCheckFill size={18} /></div>
            <p>Receive personalised quotes directly in your inbox</p>
          </div>
        </div>

        <div className='sc8-footer'>
          <button className='sc8-request-btn' onClick={() => onNext({})}>
              Request My Quote <RiArrowRightUpLine size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard8