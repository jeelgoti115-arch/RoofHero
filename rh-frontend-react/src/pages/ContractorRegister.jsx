import React from 'react'
import '../Styles/ContractorRegister.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContractorForm from '../components/ContractorForm'

const ContractorRegister = () => {
  return (
    <div>
      <Navbar />
      <ContractorForm />
      <Footer />
    </div>
  )
}

export default ContractorRegister
