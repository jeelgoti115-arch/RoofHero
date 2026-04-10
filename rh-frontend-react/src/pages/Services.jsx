import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageCard from '../components/ImageCard'
import FooterCards from '../components/FooterCards'

import ServiceCard1 from '../components/ServiceCard1'
import ServiceCard2 from '../components/ServiceCard2'
import ServiceCard3 from '../components/ServiceCard3'
import ServiceCard4 from '../components/ServiceCard4'
import ServiceCard5 from '../components/ServiceCard5'
import ServiceCard6 from '../components/ServiceCard6'
import ServiceCard7 from '../components/ServiceCard7'
import ServiceCard8 from '../components/ServiceCard8'
import ServiceCard9 from '../components/ServiceCard9'

import '../Styles/Services.css'

const Services = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinalSubmit = (formData) => {
    console.log("Form Submitted Successfully:", formData);
    alert("Quotes Requested!");
  };

  return (
    <div className="services-page">
      <Navbar />
      <ImageCard />

      <div className="service-content-area">
        {step === 1 && <ServiceCard1 onNext={nextStep} />}
        {step === 2 && <ServiceCard2 onNext={nextStep} />}
        {step === 3 && <ServiceCard3 onNext={nextStep} />}
        {step === 4 && <ServiceCard4 onNext={nextStep} />}
        {step === 5 && <ServiceCard5 onNext={nextStep} />}
        {step === 6 && <ServiceCard6 onNext={nextStep} />}
        {step === 7 && <ServiceCard7 onNext={nextStep} />}
        {step === 8 && <ServiceCard8 onNext={nextStep} />}
        {step === 9 && <ServiceCard9 onSubmit={handleFinalSubmit} />}
      </div>

      <FooterCards />
      <Footer />
    </div>
  )
}

export default Services