import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react';

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  const faqData = [
    {
      question: "How does RoofHero work?",
      answer: "RoofHero makes roof replacement simple. We generate an instant AI-powered roof report, collect quotes from licensed, vetted contractors, and help you compare and choose the best one—all in one place."
    },
    {
      question: "What’s Included in the Roof Report?",
      answer: "The roof report includes detailed measurements, material requirements, and an estimated cost range for your replacement. It’s generated using satellite imagery and AI for accuracy."
    },
    {
      question: "Is RoofHero Free for Homeowners?",
      answer: "Yes! RoofHero is completely free for homeowners. We make money by charging contractors a fee to bid on your job, ensuring only serious and competitive bids are submitted."
    },
    {
      question: "How Long Does It Take to Get Quotes?",
      answer: "You’ll receive up to 5 competitive quotes from trusted contractors within 48 hours of submitting your roof details."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className='que'>
      <div className='que-main-box'>
        <div className='que-left-box'>
          <h1>Everything You Need to Know—Simplified.</h1>
        </div>

        <div className="que-right-box">
          <div className="que-right-header">
            <p className='section-tag'>
              Ask Question 
              <img src='/OBJECTS.svg' alt='logo' className='tag-logo' />
            </p>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-container">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div className="faq-que" onClick={() => toggleAccordion(index)}>
                  <p>{item.question}</p>
                  <div className={`drop-arw ${activeIndex === index ? 'active-arw' : ''}`}>
                    {activeIndex === index ? (
                      <RiArrowDownSLine className="faq-icon" />
                    ) : (
                      <RiArrowRightSLine className="faq-icon" />
                    )}
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="faq-ans">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;