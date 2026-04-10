import React, { useState } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine } from '@remixicon/react';

const ServiceQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need council approval to replace my roof in Bondi?",
      answer: "Yes. Bondi falls under Waverley Council’s heritage overlay. RoofHero handles all DA paperwork for you."
    },
    {
      question: "What roof material lasts longest in Bondi’s salt air?",
      answer: "Colorbond Ultra or terracotta tiles rated for marine zones offer 30-year+ lifespans with minimal maintenance."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className='sq-section'>
      <div className='sq-container'>
        <div className='sq-top-box'>
          <h1>Frequently Asked Questions</h1>
          <p>Answers to common questions homeowners in Bondi have when planning roof repairs or replacements.</p>
        </div>

        <div className='sq-accordion-container'>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`sq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className='sq-question-row'>
                <h3>{faq.question}</h3>
                <div className='sq-icon-circle'>
                  {activeIndex === index ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                </div>
              </div>
              
              {activeIndex === index && (
                <div className='sq-answer-row'>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceQuestions;