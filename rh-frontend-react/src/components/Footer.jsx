import { RiArrowRightSLine } from '@remixicon/react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='upper-section'>
          <div className='logo-section'>
            <div className='logo-text-1'>
              <img src=' /footer-logo.png' alt='RoofHero logo' className='footer-logo' />
              <p className='logo-description'>Join thousands of Australians using RoofHero to find trusted roofers — fast.</p>
            </div>

            <div className='contact-info-grid'>
              <div className='info-item full-width-mobile'>
                <p className='info-header'>Address:</p>
                <p className='info-detail'>OMNII Ltd T/A RoofHero.au, Level 1, 457–459 Elizabeth Street, Surry Hills NSW 2010, Australia</p>
              </div>
              <div className='info-item'>
                <p className='info-header'>Company</p>
                <p className='info-detail'>1800 207 455</p>
              </div>
              <div className='info-item'>
                <p className='info-header'>E-mail:</p>
                <p className='info-detail'>team@roofhero.au</p>
              </div>
            </div>
          </div>

          <div className='links-section'>
            <div className='links-column'>
              <h3>Useful Links</h3>
              <nav>
                <a href='/'><RiArrowRightSLine size={18} />Home</a>
                <a href='/get-estimate'><RiArrowRightSLine size={18} />Get Estimate</a>
                <a href='/how-it-works'><RiArrowRightSLine size={18} />How It Works</a>
                <a href='/faq'><RiArrowRightSLine size={18} />FAQ</a>
              </nav>
            </div>

            <div className='links-column'>
              <h3>Company</h3>
              <nav>
                <a href='/terms'><RiArrowRightSLine size={18} />Terms & Conditions</a>
                <a href='/privacy'><RiArrowRightSLine size={18} />Privacy Policy</a>
              </nav>
            </div>
          </div>
        </div>

        <div className='bottom-section'>
          <p className='copyright'>
            Copyright & 2025. All Rights Reserved - <span className='span-accent'>roofhero.au</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer