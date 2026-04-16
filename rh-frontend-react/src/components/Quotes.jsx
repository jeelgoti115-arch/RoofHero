import { RiArrowRightUpLine } from '@remixicon/react'
import React from 'react'

const Quotes = () => {
    const quoteData = [
        {
            img: '/reports.png',
            title: 'Precision in Seconds',
            desc: 'AI-powered satellite reports delivered instantly—no site visit needed.'
        },
        {
            img: '/roofers.png',
            title: 'Trusted Roofing Professionals',
            desc: 'Only licensed, experienced roofers with proven local track records.'
        },
        {
            img: '/connect.png',
            title: 'Free to Connect',
            desc: "Zero fees to connect with Sydney's top-rated roofing professionals."
        },
        {
            img: '/ai.png',
            title: 'AI-Powered Matching',
            desc: 'Smart tech matches you with the most suitable roofing specialists.'
        },
        {
            img: '/Signature.png',
            title: 'Zero Obligation, Zero Risk',
            desc: 'Receive detailed quotes and choose if and when to proceed.'
        },
        {
            img: '/rate.png',
            title: 'Highest Standards',
            desc: 'Only 4.8+ star rated roofing contractors trusted by homeowners.'
        }
    ];

    return (
        <div className='quotes'>
            <div className='quote-header'>
                <div className='sub-quote-header'>
                    <p>
                        Smart Roofing, Simplified
                        <img src='/smart_roofing_arrow.svg' alt='arrow' className='tag-logo' />
                    </p>
                    <h1>Instant Quotes. Vetted Roofers. Best Prices.</h1>
                </div>
                <div className='quote-header-btn'>
                    <button className="cta-btn-quote">
                        Get Quotes Now
                        <RiArrowRightUpLine size={20} />
                    </button>
                </div>
            </div>

            <div className='main-quote-grid'>
                {quoteData.map((item, index) => (
                    <div className='quote-card' key={index}>
                        <div className='report-img'>
                            <img src={item.img} alt={item.title} />
                        </div>
                        <div className='quote-card-text'>
                            <p>{item.title}</p>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Quotes