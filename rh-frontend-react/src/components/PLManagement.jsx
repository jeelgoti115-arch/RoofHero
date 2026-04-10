import React, { useState } from 'react';
import { RiArrowRightUpLine } from '@remixicon/react';
import '../Styles/Admin.css'; // Ensure paths match your project

const PLManagement = () => {
  // --- STATE MANAGEMENT ---
  const [materialRates, setMaterialRates] = useState({
    slate: '$70',
    concreteTile: '$70',
    premium: '$70',
    flatMembrane: '$70',
    metal: '$70',
    asphaltShingle: '$70'
  });

  const [pitchMultipliers, setPitchMultipliers] = useState({
    lowPitch: '1.0x',
    normal: '1.2x',
    steep: '1.5x',
    flat: '1.5x'
  });

  const [complexityMultipliers, setComplexityMultipliers] = useState({
    simple: '1.0x',
    medium: '1.2x',
    complex: '1.4x'
  });

  const [scaffoldingCosts, setScaffoldingCosts] = useState({
    oneStory: '$1,000',
    twoStory: '$2,000',
    threeStory: '$3,000',
    fourStory: '$4,000'
  });

  const [estimateSettings, setEstimateSettings] = useState({
    fixedSetupCost: '$4,000',
    estimateMargin: '10%'
  });

  // --- HANDLERS ---
  const handleMaterialRateChange = (key, value) => {
    setMaterialRates(prev => ({ ...prev, [key]: value }));
  };

  const handlePitchMultiplierChange = (key, value) => {
    setPitchMultipliers(prev => ({ ...prev, [key]: value }));
  };

  const handleComplexityChange = (key, value) => {
    setComplexityMultipliers(prev => ({ ...prev, [key]: value }));
  };

  const handleScaffoldingChange = (key, value) => {
    setScaffoldingCosts(prev => ({ ...prev, [key]: value }));
  };

  const handleEstimateSettingsChange = (key, value) => {
    setEstimateSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = () => {
    const allData = {
      materialRates,
      pitchMultipliers,
      complexityMultipliers,
      scaffoldingCosts,
      estimateSettings
    };
    console.log('Saved Data:', allData);
    alert('All changes have been saved successfully!');
  };

  const handleCancel = () => {
    // Reload initial values
    setMaterialRates({
      slate: '$70',
      concreteTile: '$70',
      premium: '$70',
      flatMembrane: '$70',
      metal: '$70',
      asphaltShingle: '$70'
    });
    setPitchMultipliers({
      lowPitch: '1.0x',
      normal: '1.2x',
      steep: '1.5x',
      flat: '1.5x'
    });
    setComplexityMultipliers({
      simple: '1.0x',
      medium: '1.2x',
      complex: '1.4x'
    });
    setScaffoldingCosts({
      oneStory: '$1,000',
      twoStory: '$2,000',
      threeStory: '$3,000',
      fourStory: '$4,000'
    });
    setEstimateSettings({
      fixedSetupCost: '$4,000',
      estimateMargin: '10%'
    });
  };

  return (
    <div className="da-plm-main-container animate-fade">
      <h1 className="da-plm-page-title">Pricing Logic Management</h1>

      <div className="da-plm-content-card">
        
        {/* --- Material Rate Section --- */}
        <section className="da-plm-section">
          <h3 className="da-plm-section-title">Material Rate (per m²)</h3>
          <p className="da-plm-section-desc">Admin can edit material rates based on different roofing types.</p>
          <div className="da-plm-grid-4">
            <RateInput label="Slate" value={materialRates.slate} unit="/m²" onChange={(val) => handleMaterialRateChange('slate', val)} />
            <RateInput label="Concrete Tile" value={materialRates.concreteTile} unit="/m²" onChange={(val) => handleMaterialRateChange('concreteTile', val)} />
            <RateInput label="Premium" value={materialRates.premium} unit="/m²" onChange={(val) => handleMaterialRateChange('premium', val)} />
            <RateInput label="Flat/ Membrane" value={materialRates.flatMembrane} unit="/m²" onChange={(val) => handleMaterialRateChange('flatMembrane', val)} />
            <RateInput label="Metal" value={materialRates.metal} unit="/m²" onChange={(val) => handleMaterialRateChange('metal', val)} />
            <RateInput label="Asphalt Shingle" value={materialRates.asphaltShingle} unit="/m²" onChange={(val) => handleMaterialRateChange('asphaltShingle', val)} />
          </div>
        </section>

        {/* --- Pitch Multipliers Section --- */}
        <section className="da-plm-section">
          <h3 className="da-plm-section-title">Pitch Multipliers</h3>
          <p className="da-plm-section-desc">Admin can set multipliers for different roof pitches.</p>
          <div className="da-plm-grid-4">
            <SimpleInput label="Low Pitch" value={pitchMultipliers.lowPitch} onChange={(val) => handlePitchMultiplierChange('lowPitch', val)} />
            <SimpleInput label="Normal" value={pitchMultipliers.normal} onChange={(val) => handlePitchMultiplierChange('normal', val)} />
            <SimpleInput label="Steep" value={pitchMultipliers.steep} onChange={(val) => handlePitchMultiplierChange('steep', val)} />
            <SimpleInput label="Flat" value={pitchMultipliers.flat} onChange={(val) => handlePitchMultiplierChange('flat', val)} />
          </div>
        </section>

        {/* --- Complexity Multipliers Section --- */}
        <section className="da-plm-section">
          <h3 className="da-plm-section-title">Complexity Multipliers</h3>
          <p className="da-plm-section-desc">Admin can set complexity multipliers for different roof complexity levels.</p>
          <div className="da-plm-grid-3">
            <SimpleInput label="Simple" value={complexityMultipliers.simple} onChange={(val) => handleComplexityChange('simple', val)} />
            <SimpleInput label="Medium" value={complexityMultipliers.medium} onChange={(val) => handleComplexityChange('medium', val)} />
            <SimpleInput label="Complex" value={complexityMultipliers.complex} onChange={(val) => handleComplexityChange('complex', val)} />
          </div>
        </section>

        {/* --- Scaffolding Cost Section --- */}
        <section className="da-plm-section">
          <h3 className="da-plm-section-title">Scaffolding Cost Logic</h3>
          <p className="da-plm-section-desc">Admin can define the scaffolding cost for different building story types.</p>
          <div className="da-plm-grid-4">
            <SimpleInput label="1 Story" value={scaffoldingCosts.oneStory} onChange={(val) => handleScaffoldingChange('oneStory', val)} />
            <SimpleInput label="2 Story" value={scaffoldingCosts.twoStory} onChange={(val) => handleScaffoldingChange('twoStory', val)} />
            <SimpleInput label="3 Story" value={scaffoldingCosts.threeStory} onChange={(val) => handleScaffoldingChange('threeStory', val)} />
            <SimpleInput label="4 Story" value={scaffoldingCosts.fourStory} onChange={(val) => handleScaffoldingChange('fourStory', val)} />
          </div>
        </section>

        {/* --- Cost & Estimate Settings --- */}
        <section className="da-plm-section">
          <h3 className="da-plm-section-title">Cost & Estimate Settings</h3>
          <p className="da-plm-section-desc">allows the admin to set the fixed setup cost and margin of error (estimate range) to be applied in quotes.</p>
          <div className="da-plm-grid-2">
            <SimpleInput label="Fixed Setup Base Cost" value={estimateSettings.fixedSetupCost} onChange={(val) => handleEstimateSettingsChange('fixedSetupCost', val)} />
            <SimpleInput label="Estimate Range Margin" value={estimateSettings.estimateMargin} onChange={(val) => handleEstimateSettingsChange('estimateMargin', val)} />
          </div>
        </section>

        {/* --- Footer Buttons --- */}
        <div className="da-plm-actions">
          <button className="da-plm-btn-save" onClick={handleSaveChanges}>
            Save Changes <RiArrowRightUpLine size={18} />
          </button>
          <button className="da-plm-btn-cancel" onClick={handleCancel}>
            Cancel <RiArrowRightUpLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const RateInput = ({ label, value, unit, onChange }) => (
  <div className="da-plm-input-group">
    <label>{label}</label>
    <div className="da-plm-input-wrapper">
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      <span className="da-plm-unit-badge">{unit}</span>
    </div>
  </div>
);

const SimpleInput = ({ label, value, onChange }) => (
  <div className="da-plm-input-group">
    <label>{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="da-plm-basic-input" />
  </div>
);

export default PLManagement;