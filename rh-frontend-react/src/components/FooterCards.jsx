import { RiCheckFill } from '@remixicon/react'
import React from 'react'

const FooterCards = () => {
  return (
    <div className='sc-wrapper'>
      <div className='sc1-footer-badges'>
        <div className='sc1-badge'>
            <div className='sc1-badge-check'><RiCheckFill size={20} /></div>
            <p>Multiple Contractor Quotes</p>
        </div>
        <div className='sc1-badge'>
            <div className='sc1-badge-check'><RiCheckFill size={20} /></div>
            <p>Competitive Pricing</p>
        </div>
        <div className='sc1-badge'>
            <div className='sc1-badge-check'><RiCheckFill size={20} /></div>
            <p>Verified Reviews & Ratings</p>
        </div>
        <div className='sc1-badge'>
            <div className='sc1-badge-check'><RiCheckFill size={20} /></div>
            <p>Choose with Confidence</p>
        </div>
      </div>
    </div>
  )
}

export default FooterCards
