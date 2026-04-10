import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';

const Accordion = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="accordion-wrapper">
      <div className="accordion-header" onClick={onToggle}>
        <h4>{title}</h4>
        {/* If open, circle is dark green; if closed, circle is orange as per your image */}
        <div className={`arrow-circle ${isOpen ? 'active' : 'closed-style'}`}>
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
      </div>
      {isOpen && <div className="accordion-body animate-fade">{children}</div>}
    </div>
  );
};

export default Accordion;