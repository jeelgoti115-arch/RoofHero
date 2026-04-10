import React from 'react'
import Navbar from '../components/Navbar'
import ServiceHero from '../components/ServiceHero'
import ServiceHomeowners from '../components/ServiceHomeowners'
import AssignedServices from '../components/AssignedServices'
import RoofingCompanies from '../components/RoofingCompanies'
import CustomerTestimonial from '../components/CustomerTestimonial'
import ServiceQuestions from '../components/ServiceQuestions'
import ServiceInstruction from '../components/ServiceInstruction'
import AvailabilityAndPromise from '../components/AvailabilityAndPromise'
import Footer from '../components/Footer'
import '../Styles/HomeOwner.css'

const HomeOwner = () => {
  return (
    <div>
      <Navbar />
      <ServiceHero />
      <ServiceHomeowners />
      <AssignedServices />
      <RoofingCompanies />
      <CustomerTestimonial />
      <ServiceQuestions />
      <ServiceInstruction />
      <AvailabilityAndPromise />
      <Footer />
    </div>
  )
}

export default HomeOwner
