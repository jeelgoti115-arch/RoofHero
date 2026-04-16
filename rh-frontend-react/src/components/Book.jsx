import React from 'react'
import { RiArrowRightUpLine, RiPhoneFill } from '@remixicon/react'

const Book = () => {
  return (
    <section className='book-section'>
      <div className='book-container'>
        <div className='left-box-book'>
          <div className="image-wrapper">
             <img src='/2-book.png' alt='Roofing service' />
          </div>
        </div>

        <div className='right-box-book'>
          <div className='header-section'>
            <p className='section-tag'>
              WHY CHOOSE US 
              <img src='/OBJECTS.svg' alt='squiggle' className='tag-logo' />
            </p>
            <h1>Multiple Quotes. One Easy Choice.</h1>
          </div>
          
          <div className='features-container'>
            <div className='details'>
              <div className='icon-wrapper'>
                <img src='/book-vector.png' alt='icon' />
              </div>
              <div className="text-content">
                <h6>Compare & Choose with Confidence</h6>
                <p>Get multiple quotes from vetted local roofers — fast, fair, and all in one place.</p>
              </div>
            </div>
            
            <div className='details'>
              <div className='icon-wrapper'>
                <img src='/book-vector-2.png' alt='icon' />
              </div>
              <div className="text-content">
                <h6>Transparent, Accurate Pricing</h6>
                <p>AI-powered estimates and clear breakdowns mean no hidden costs or surprises.</p>
              </div>
            </div>
            
            <div className='details'>
              <div className='icon-wrapper'>
                <img src='/book-vector-3.png' alt='icon' />
              </div>
              <div className="text-content">
                <h6>Quality You Can Trust</h6>
                <p>Every job is independently inspected for safety, quality, and peace of mind.</p>
              </div>
            </div>
          </div>

          <div className='call-btn-area'>
            <button className='cta-btn-book'>
              Book a Call <RiArrowRightUpLine size={18} />
            </button>
            <div className='phone-section'>
              <span className='phone-icon-bg'><RiPhoneFill size={20} /></span>
              <p>Need help? <span>1800 207 455</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Book