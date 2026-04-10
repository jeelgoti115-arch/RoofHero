import { RiArrowRightUpLine, RiCheckFill } from '@remixicon/react'
import React from 'react'

import { useNavigate } from 'react-router-dom';

const ServiceHero = () => {
	const navigate = useNavigate();

	const handleQuoteClick = () => {
    console.log("Button clicked!");
    navigate('/services');
  	};

	return (
		<section className='service-section'>
			<div className='service-hero'>
				<div className='hero-content'>
					<h1>Roof Replacement in Bondi</h1>
					<p className='hero-subtitle'>Instant roof estimate • 3 free quotes • Bondi’s coastal-proof roofing experts</p>
					
					<form className='hero-input-area' onSubmit={handleQuoteClick}>
						<input type='text' placeholder='Enter Address' className='textarea' required></input>
						<button className='cta-btn-service' type='submit'>
							Get Instant Estimate <RiArrowRightUpLine size={20} />
						</button>
					</form>
				</div>
			</div>

			<div className='s-cards'>
				<div className='service-card'>
					<div className='hero-icon'><RiCheckFill size={20} /></div>
					<p>Price in 30 seconds</p>
				</div>
				<div className='service-card'>
					<div className='hero-icon'><RiCheckFill size={20} /></div>
					<p>AI-powered accuracy</p>
				</div>
				<div className='service-card'>
					<div className='hero-icon'><RiCheckFill size={20} /></div>
					<p>Licensed, 5-star roofers</p>
				</div>
				<div className='service-card'>
					<div className='hero-icon'><RiCheckFill size={20} /></div>
					<p>No hidden fees</p>
				</div>
			</div>
		</section>
	)
}

export default ServiceHero