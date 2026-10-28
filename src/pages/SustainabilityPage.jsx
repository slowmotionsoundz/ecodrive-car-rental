import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SustainabilityPage() {
  const [miles, setMiles] = useState(350);

  // Constants for calculation
  // Avg gas car: 28 MPG, 8.887 kg CO2 per gallon of gasoline -> ~0.317 kg CO2/mi
  // EV with CA grid: ~0.08 kg CO2/mi or 0 with 100% solar
  // EcoDrive certified clean grid: 0 kg net emissions
  const co2SavedKg = ((miles / 28) * 8.887).toFixed(1);
  const gasGallonsSaved = (miles / 28).toFixed(1);
  const gasCostSaved = ((miles / 28) * 5.25).toFixed(0); // $5.25/gal CA average
  const treesEquivalent = Math.round(Number(co2SavedKg) / 21); // ~21 kg CO2 absorbed per tree per year

  return (
    <div className="page-container">
      {/* Header */}
      <section className="page-header">
        <div className="hero-pill">
          <span>🌱 Verified Carbon-Neutral Mobility</span>
        </div>
        <h1 className="page-title">Driving Towards Real Zero Emissions</h1>
        <p className="page-description">
          At EcoDrive, sustainability isn't an afterthought. 100% of our fleet runs on zero-emission electricity sourced directly from California solar farms and certified wind generation.
        </p>
      </section>

      {/* Interactive Impact Calculator */}
      <section className="calculator-section">
        <div className="calculator-card">
          <div className="calculator-header">
            <div>
              <h2 className="calc-title">Interactive Environmental Impact Calculator</h2>
              <p className="calc-subtitle">Estimate how much tailpipe pollution and money you prevent by renting an EV.</p>
            </div>
            <span className="calc-badge">Live Metric Simulator</span>
          </div>

          <div className="slider-control-block">
            <div className="slider-label-row">
              <span className="slider-prompt">Estimated Trip Distance:</span>
              <strong className="slider-value-display">{miles} Miles</strong>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="25"
              value={miles}
              onChange={(e) => setMiles(Number(e.target.value))}
              className="calculator-slider"
            />
            <div className="slider-ticks">
              <span>50 mi (Local)</span>
              <span>350 mi (SF to Tahoe)</span>
              <span>800 mi (Pacific Coast)</span>
              <span>1,500 mi (Roadtrip)</span>
            </div>
          </div>

          {/* Calculator Output Grid */}
          <div className="impact-results-grid">
            <div className="impact-card highlight-card">
              <span className="impact-icon">💨</span>
              <div className="impact-metric-val text-emerald">{co2SavedKg} kg</div>
              <div className="impact-metric-label">CO₂ Emissions Avoided</div>
              <p className="impact-desc">Like taking a regular gas car off the road for {Math.round(miles / 30)} days.</p>
            </div>

            <div className="impact-card">
              <span className="impact-icon">⛽</span>
              <div className="impact-metric-val">{gasGallonsSaved} gal</div>
              <div className="impact-metric-label">Gasoline Never Burned</div>
              <p className="impact-desc">Gas you didn't have to pump or burn into the air.</p>
            </div>

            <div className="impact-card">
              <span className="impact-icon">💵</span>
              <div className="impact-metric-val">${gasCostSaved}</div>
              <div className="impact-metric-label">Fuel Expenses Saved</div>
              <p className="impact-desc">Real cash kept in your wallet by skipping California gas pumps.</p>
            </div>

            <div className="impact-card">
              <span className="impact-icon">🌲</span>
              <div className="impact-metric-val text-emerald">{Math.max(1, treesEquivalent)}</div>
              <div className="impact-metric-label">Trees Equivalent</div>
              <p className="impact-desc">The clean-air impact of planting {Math.max(1, treesEquivalent)} trees for a full year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Infrastructure Pillars */}
      <section className="sustainability-pillars">
        <h2 className="section-title text-center">Our Clean Energy Commitment</h2>
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">☀️</div>
            <h3>Solar-Powered Hubs</h3>
            <p>
              Our airport hubs run on rooftop solar, so every charge comes from 100% clean sunshine.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">🔄</div>
            <h3>Responsible Recycling</h3>
            <p>
              All car batteries are tracked for health and recycled into clean energy storage when retired.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">📄</div>
            <h3>Green Trip Receipts</h3>
            <p>
              Get an official certificate showing your exact CO₂ savings, ready for your work expense reports.
            </p>
          </div>
        </div>

        <div className="cta-banner">
          <div>
            <h3>Ready to reduce your carbon footprint?</h3>
            <p>Reserve an electric vehicle today and pick up contactlessly in minutes.</p>
          </div>
          <Link to="/fleet" className="btn-primary-large">
            Browse Zero-Emission Fleet →
          </Link>
        </div>
      </section>
    </div>
  );
}
