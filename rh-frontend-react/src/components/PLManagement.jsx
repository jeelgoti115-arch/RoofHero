import React, { useState, useEffect } from 'react';
import { RiArrowRightUpLine } from '@remixicon/react';
import '../Styles/Admin.css'; // Ensure paths match your project

const defaultPricingLogic = {
  materialRates: {
    slate: '$70',
    concreteTile: '$70',
    premium: '$70',
    flatMembrane: '$70',
    metal: '$70',
    asphaltShingle: '$70',
  },
  pitchMultipliers: {
    lowPitch: '1.0x',
    normal: '1.2x',
    steep: '1.5x',
    flat: '1.5x',
  },
  complexityMultipliers: {
    simple: '1.0x',
    medium: '1.2x',
    complex: '1.4x',
  },
  scaffoldingCosts: {
    oneStory: '$1,000',
    twoStory: '$2,000',
    threeStory: '$3,000',
    fourStory: '$4,000',
  },
  estimateSettings: {
    fixedSetupCost: '$4,000',
    estimateMargin: '10%',
  },
};

const PLManagement = () => {
  // --- STATE MANAGEMENT ---
  const [materialRates, setMaterialRates] = useState(defaultPricingLogic.materialRates);
  const [pitchMultipliers, setPitchMultipliers] = useState(defaultPricingLogic.pitchMultipliers);
  const [complexityMultipliers, setComplexityMultipliers] = useState(defaultPricingLogic.complexityMultipliers);
  const [scaffoldingCosts, setScaffoldingCosts] = useState(defaultPricingLogic.scaffoldingCosts);
  const [estimateSettings, setEstimateSettings] = useState(defaultPricingLogic.estimateSettings);
  const [savedPricingLogic, setSavedPricingLogic] = useState(defaultPricingLogic);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const loadPricingLogic = async () => {
      try {
        const token = window.localStorage.getItem('roofheroToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch('/api/admin/pricing-logic', { headers });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to load pricing settings.')
        }

        const data = await response.json();
        const normalized = {
          materialRates: data.materialRates || defaultPricingLogic.materialRates,
          pitchMultipliers: data.pitchMultipliers || defaultPricingLogic.pitchMultipliers,
          complexityMultipliers: data.complexityMultipliers || defaultPricingLogic.complexityMultipliers,
          scaffoldingCosts: data.scaffoldingCosts || defaultPricingLogic.scaffoldingCosts,
          estimateSettings: data.estimateSettings || defaultPricingLogic.estimateSettings,
        };

        setMaterialRates(normalized.materialRates);
        setPitchMultipliers(normalized.pitchMultipliers);
        setComplexityMultipliers(normalized.complexityMultipliers);
        setScaffoldingCosts(normalized.scaffoldingCosts);
        setEstimateSettings(normalized.estimateSettings);
        setSavedPricingLogic(normalized);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message || 'Unable to load pricing settings.');
      } finally {
        setLoading(false);
      }
    };

    loadPricingLogic();
  }, []);

  const resetToSaved = () => {
    setMaterialRates(savedPricingLogic.materialRates);
    setPitchMultipliers(savedPricingLogic.pitchMultipliers);
    setComplexityMultipliers(savedPricingLogic.complexityMultipliers);
    setScaffoldingCosts(savedPricingLogic.scaffoldingCosts);
    setEstimateSettings(savedPricingLogic.estimateSettings);
    setErrorMessage('');
    setSaveMessage('');
  };

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

  const handleSaveChanges = async () => {
    const payload = {
      materialRates,
      pitchMultipliers,
      complexityMultipliers,
      scaffoldingCosts,
      estimateSettings,
    };

    try {
      const token = window.localStorage.getItem('roofheroToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const response = await fetch('/api/admin/pricing-logic', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save pricing settings.')
      }

      const updated = await response.json();
      const normalized = {
        materialRates: updated.materialRates || defaultPricingLogic.materialRates,
        pitchMultipliers: updated.pitchMultipliers || defaultPricingLogic.pitchMultipliers,
        complexityMultipliers: updated.complexityMultipliers || defaultPricingLogic.complexityMultipliers,
        scaffoldingCosts: updated.scaffoldingCosts || defaultPricingLogic.scaffoldingCosts,
        estimateSettings: updated.estimateSettings || defaultPricingLogic.estimateSettings,
      };

      setSavedPricingLogic(normalized);
      setMaterialRates(normalized.materialRates);
      setPitchMultipliers(normalized.pitchMultipliers);
      setComplexityMultipliers(normalized.complexityMultipliers);
      setScaffoldingCosts(normalized.scaffoldingCosts);
      setEstimateSettings(normalized.estimateSettings);
      setSaveMessage('Pricing settings saved.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'Unable to save pricing settings.');
      setSaveMessage('');
    }
  };

  const handleCancel = () => {
    resetToSaved();
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
          <button className="da-plm-btn-save" onClick={handleSaveChanges} disabled={loading}>
            Save Changes <RiArrowRightUpLine size={18} />
          </button>
          <button className="da-plm-btn-cancel" onClick={handleCancel} disabled={loading}>
            Cancel <RiArrowRightUpLine size={18} />
          </button>
        </div>

        {(loading || errorMessage || saveMessage) && (
          <div className="da-plm-status-block">
            {loading && <p className="da-plm-status-text">Loading pricing logic...</p>}
            {errorMessage && <p className="da-plm-status-error">{errorMessage}</p>}
            {saveMessage && <p className="da-plm-status-success">{saveMessage}</p>}
          </div>
        )}
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