import { RiArrowRightUpLine } from '@remixicon/react';
import React from 'react';

const Solutions = () => {
  return (
    <section className="solutions">
      <div className="main-box-sol">
        <div className="left-box-solutions">
          <p className="section-tag">
            Solutions
            <img src="public/OBJECTS.svg" alt="accent" className="tag-logo" />
          </p>
          <h1>Our Roof Replacement Solutions</h1>
          <div className="text-content">
            <p className="left-p">
              At RoofHero.au, we make replacing your roof simple, efficient, and reliable. Whether you're upgrading an old roof or tackling storm damage, our process is designed to deliver top-quality results without the stress. We partner only with licensed, experienced contractors who meet our strict standards, so you can trust your home is in good hands.
            </p>
            <p className="left-p">
              Choose from a wide range of roofing options including sleek metal panels, classic terracotta tiles, durable asphalt shingles, elegant slate, or high-performance flat roof membranes. Our AI-powered quoting system ensures accurate, instant estimates, while our transparent process keeps you informed every step of the way. It's roof replacement—done right.
            </p>
          </div>
        </div>

        <div className="right-box-solutions">
          <div className="sol-right-div">
            <p>Join thousands of Australians using RoofHero to find trusted roofers — fast.</p>
            <button className="cta-btn-sol" type="button">
              Send Roof Info Now<RiArrowRightUpLine />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
