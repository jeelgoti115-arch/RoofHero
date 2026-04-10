import { RiStarFill } from '@remixicon/react'
import React from 'react'

const RoofingCompanies = () => {
  return (
    <section className="companies-section">
      <div className="companies-header">
        <h1>Top Roofing Companies in Bondi</h1>
        <p>
          Use our custom roofing company search tool above to narrow results to your exact requirements, 
          ensuring we connect you with the best roofing company in Bondi. A curated list of leading Bondi roofers appears below.
        </p>
      </div>

      <div className="table-container">
        <table className="roofing-table">
          <thead>
            <tr>
              <th>Roofer</th>
              <th>Rating</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bondi Roof Services</td>
              <td className="rating-cell">
                <RiStarFill size={18} color="#FFC700" /> <span>4.9</span>
              </td>
              <td>(02) 8000 1234</td>
              <td>123 Glenayr Ave</td>
            </tr>
            <tr>
              <td>Coastal Roofing Group</td>
              <td className="rating-cell">
                <RiStarFill size={18} color="#FFC700" /> <span>4.9</span>
              </td>
              <td>(02) 9000 4567</td>
              <td>89 Campbell Pde</td>
            </tr>
            <tr>
              <td>Eastern Suburbs Roofing Co</td>
              <td className="rating-cell">
                <RiStarFill size={18} color="#FFC700" /> <span>4.9</span>
              </td>
              <td>(02) 8123 9876</td>
              <td>45 Curlewis St</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RoofingCompanies