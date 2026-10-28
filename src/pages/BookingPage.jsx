import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fleetData, categories } from '../data/fleetData';

export default function BookingPage({
  selectedHub,
  setSelectedHub,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  activeRentalCar,
  setActiveRentalCar,
  setIsLocked
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // If a car was passed via router state (e.g. from clicking Reserve on Homepage or Fleet)
  const initialCar = location.state?.preselectedCar || fleetData.find(c => c.name === activeRentalCar) || fleetData[0];
  const cameFromHome = Boolean(location.state?.fromHome);

  // Stepper state (1 to 4)
  const [currentStep, setCurrentStep] = useState(cameFromHome ? 2 : 1);
  const [chosenCar, setChosenCar] = useState(initialCar);
  const [activeCategory, setActiveCategory] = useState('all');

  // Coverage tier state
  const [selectedCoverage, setSelectedCoverage] = useState('EcoShield Premium');

  // Calendar Day Picker State (demo interactive calendar for October 2026)
  const [startDay, setStartDay] = useState(22);
  const [endDay, setEndDay] = useState(25);
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [returnTime, setReturnTime] = useState('06:00 PM');

  // Calculations
  const rentalDays = Math.max(1, endDay - startDay);
  const dailyRate = chosenCar ? chosenCar.price : 89;
  const coverageDailyFee = selectedCoverage === 'EcoShield Premium' ? 18 : 0;
  const vehicleSubtotal = dailyRate * rentalDays;
  const coverageSubtotal = coverageDailyFee * rentalDays;
  const estimatedTax = Math.round((vehicleSubtotal + coverageSubtotal) * 0.085);
  const grandTotal = vehicleSubtotal + coverageSubtotal + estimatedTax;

  // Calendar Range Selection Logic:
  // 1st click sets pickup date (startDay)
  // 2nd click sets return date (endDay)
  const [selectingStep, setSelectingStep] = useState('return'); // 'start' or 'return'

  const handleDayClick = (day) => {
    if (day < 22) return; // disable past dates

    if (selectingStep === 'start' || day <= startDay) {
      setStartDay(day);
      setEndDay(day + 1); // default 1 day minimum
      setSelectingStep('return');
    } else {
      setEndDay(day);
      setSelectingStep('start'); // ready to re-select on next click
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 4 final confirmation: update global app state and redirect to /account
      setActiveRentalCar(chosenCar.name);
      setIsLocked(true);
      navigate('/account', {
        state: {
          bookingConfirmed: true,
          carName: chosenCar.name
        }
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter cars for Stage 2
  const filteredCars = activeCategory === 'all'
    ? fleetData
    : fleetData.filter(c => c.categories && c.categories.includes(activeCategory));

  return (
    <div className="page-container booking-page-container">
      {/* Page Header */}
      <section className="page-header booking-engine-header">
        <div className="hero-pill">
          <span>⚡ Step-by-Step EV Reservation</span>
        </div>
        <h1 className="page-title">Sequential Booking Engine</h1>
        <p className="page-description">
          Complete your zero-emission electric rental in 4 quick stages with instant digital key activation.
        </p>
      </section>

      {/* Stepper Navigation Ribbon */}
      <div className="booking-stepper-bar">
        <div
          className={`booking-step-chip ${currentStep === 1 ? 'step-chip-active' : ''} ${currentStep > 1 ? 'step-chip-done' : ''}`}
          onClick={() => setCurrentStep(1)}
        >
          <span className="step-badge">{currentStep > 1 ? '✓' : '1'}</span>
          <span className="step-title-text">Location & Dates</span>
        </div>

        <div
          className={`booking-step-chip ${currentStep === 2 ? 'step-chip-active' : ''} ${currentStep > 2 ? 'step-chip-done' : ''}`}
          onClick={() => setCurrentStep(2)}
        >
          <span className="step-badge">{currentStep > 2 ? '✓' : '2'}</span>
          <span className="step-title-text">Vehicle Select</span>
        </div>

        <div
          className={`booking-step-chip ${currentStep === 3 ? 'step-chip-active' : ''} ${currentStep > 3 ? 'step-chip-done' : ''}`}
          onClick={() => setCurrentStep(3)}
        >
          <span className="step-badge">{currentStep > 3 ? '✓' : '3'}</span>
          <span className="step-title-text">Coverage Tier</span>
        </div>

        <div
          className={`booking-step-chip ${currentStep === 4 ? 'step-chip-active' : ''}`}
          onClick={() => setCurrentStep(4)}
        >
          <span className="step-badge">4</span>
          <span className="step-title-text">Confirmation</span>
        </div>
      </div>

      {/* ================= STAGE 1: LOCATION & DATES ================= */}
      {currentStep === 1 && (
        <div className="booking-stage-card">
          <div className="stage-header-block">
            <h2 className="stage-heading">Stage 1: Choose Pickup Location & Calendar Dates</h2>
            <p className="stage-sub">Select your Bay Area hub and pick travel dates directly on the interactive calendar.</p>
          </div>

          <div className="booking-form-row">
            <div className="booking-field-group">
              <label className="field-lbl">Pickup & Return Hub</label>
              <select
                className="booking-select-input"
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
              >
                <option value="SFO Airport Hub">📍 San Francisco Airport (SFO Hub • 16x 250kW Superchargers)</option>
                <option value="Downtown Hub">📍 Downtown SF Hub (California St • 8x 150kW Level 3)</option>
                <option value="San Jose Hub">📍 San Jose Airport (SJC Hub • 12x 250kW Superchargers)</option>
              </select>
            </div>
          </div>

          {/* Visual Interactive Calendar Component */}
          <div className="booking-calendar-widget">
            <div className="calendar-month-bar">
              <span className="cal-prev-btn">‹</span>
              <span className="calendar-month-name">October 2026</span>
              <span className="cal-next-btn">›</span>
            </div>

            <div className="calendar-days-grid">
              <span className="weekday-header">Sun</span>
              <span className="weekday-header">Mon</span>
              <span className="weekday-header">Tue</span>
              <span className="weekday-header">Wed</span>
              <span className="weekday-header">Thu</span>
              <span className="weekday-header">Fri</span>
              <span className="weekday-header">Sat</span>

              {/* Week 1 */}
              <span className="day-cell day-muted">28</span>
              <span className="day-cell day-muted">29</span>
              <span className="day-cell day-muted">30</span>
              <span className="day-cell day-muted">1</span>
              <span className="day-cell day-muted">2</span>
              <span className="day-cell day-muted">3</span>
              <span className="day-cell day-muted">4</span>

              {/* Week 2 */}
              <span className="day-cell day-muted">5</span>
              <span className="day-cell day-muted">6</span>
              <span className="day-cell day-muted">7</span>
              <span className="day-cell day-muted">8</span>
              <span className="day-cell day-muted">9</span>
              <span className="day-cell day-muted">10</span>
              <span className="day-cell day-muted">11</span>

              {/* Week 3 */}
              <span className="day-cell day-muted">12</span>
              <span className="day-cell day-muted">13</span>
              <span className="day-cell day-muted">14</span>
              <span className="day-cell day-muted">15</span>
              <span className="day-cell day-muted">16</span>
              <span className="day-cell day-muted">17</span>
              <span className="day-cell day-muted">18</span>

              {/* Week 4 (Interactive selection range) */}
              <span className="day-cell day-muted">19</span>
              <span className="day-cell day-muted">20</span>
              <span className="day-cell day-muted">21</span>
              {[22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((day) => {
                const isStart = day === startDay;
                const isEnd = day === endDay;
                const inRange = day > startDay && day < endDay;

                let rangeClass = '';
                if (isStart) rangeClass = 'day-range-start';
                else if (isEnd) rangeClass = 'day-range-end';
                else if (inRange) rangeClass = 'day-in-range';

                return (
                  <span
                    key={day}
                    className={`day-cell day-active ${rangeClass}`}
                    onClick={() => handleDayClick(day)}
                    title={isStart ? 'Pickup Date' : isEnd ? 'Return Date' : `Click to select Oct ${day}`}
                  >
                    {day}
                  </span>
                );
              })}
              <span className="day-cell day-muted">1</span>
            </div>

            {/* Visual Selected Date Ribbon */}
            <div className="calendar-summary-ribbon">
              <div className="cal-summary-left">
                <span className="cal-pin-icon">🗓️</span>
                <span>Selected: <strong>Thu, Oct {startDay} → Sun, Oct {endDay}</strong></span>
              </div>
              <div className="cal-summary-badge">
                {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'} ({rentalDays * 24} Hours)
              </div>
            </div>

            {/* Time Slot Choosers */}
            <div className="calendar-time-grid">
              <div className="time-picker-block">
                <span className="time-picker-label">Pickup Time</span>
                <select
                  className="time-picker-select"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                >
                  <option>08:00 AM</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM (Recommended)</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                </select>
              </div>

              <div className="time-picker-block">
                <span className="time-picker-label">Return Time</span>
                <select
                  className="time-picker-select"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                >
                  <option>04:00 PM</option>
                  <option>05:00 PM</option>
                  <option>06:00 PM (Recommended)</option>
                  <option>07:00 PM</option>
                  <option>08:00 PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 2: VEHICLE SELECTION ================= */}
      {currentStep === 2 && (
        <div className="booking-stage-card">
          <div className="stage-header-block">
            <h2 className="stage-heading">Stage 2: Select Your Electric Vehicle</h2>
            <p className="stage-sub">Choose from our 100% zero-emission electric fleet.</p>
          </div>

          {/* Category Tabs */}
          <div className="booking-cat-tabs">
            <button
              type="button"
              className={`booking-cat-tab ${activeCategory === 'all' ? 'cat-tab-active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Models ({fleetData.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`booking-cat-tab ${activeCategory === cat ? 'cat-tab-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vehicle Grid with Real Images */}
          <div className="booking-vehicles-grid">
            {filteredCars.map((car) => {
              const isSelected = chosenCar && chosenCar.id === car.id;
              return (
                <div
                  key={car.id}
                  className={`booking-car-card ${isSelected ? 'car-card-selected' : ''}`}
                  onClick={() => setChosenCar(car)}
                >
                  <div className="booking-car-photo-wrap">
                    {car.name === initialCar.name && cameFromHome && (
                      <span className="car-from-home-badge">⭐ Selected from Home</span>
                    )}
                    <img src={car.image} alt={car.name} className="booking-car-img" />
                    <span className="booking-car-range-badge">⚡ {car.range}</span>
                  </div>

                  <div className="booking-car-body">
                    <div>
                      <h3 className="booking-car-name">{car.name}</h3>
                      <p className="booking-car-meta">{car.drive} • {car.acceleration}</p>
                    </div>

                    <div className="booking-car-bottom-row">
                      <div className="booking-car-pricing">
                        <strong className="booking-price-number">${car.price}</strong>
                        <span className="booking-price-unit"> / day</span>
                      </div>
                      <div className={`booking-radio-circle ${isSelected ? 'radio-selected' : ''}`}>
                        {isSelected && <span>✓</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STAGE 3: COVERAGE TIERS ================= */}
      {currentStep === 3 && (
        <div className="booking-stage-card">
          <div className="stage-header-block">
            <h2 className="stage-heading">Stage 3: Select Coverage & Protection Tier</h2>
            <p className="stage-sub">Choose peace-of-mind protection for your electric road trip.</p>
          </div>

          <div className="booking-coverage-grid">
            {/* Tier 1: Standard Basic */}
            <div
              className={`booking-coverage-box ${selectedCoverage === 'Standard Basic' ? 'coverage-box-selected' : ''}`}
              onClick={() => setSelectedCoverage('Standard Basic')}
            >
              <div className="cov-card-header">
                <div>
                  <h3 className="cov-card-title">Standard Basic</h3>
                  <span className="cov-card-tag">Standard State Minimum</span>
                </div>
                <div className="cov-card-price">Included ($0)</div>
              </div>
              <ul className="cov-card-benefits">
                <li>State minimum liability protection</li>
                <li>$1,000 collision damage deductible</li>
                <li>24/7 basic roadside phone support</li>
              </ul>
              <div className="cov-select-footer">
                <span className="cov-footer-label">
                  {selectedCoverage === 'Standard Basic' ? '✓ Selected' : 'Click to select'}
                </span>
              </div>
            </div>

            {/* Tier 2: EcoShield Premium */}
            <div
              className={`booking-coverage-box ${selectedCoverage === 'EcoShield Premium' ? 'coverage-box-selected' : ''}`}
              onClick={() => setSelectedCoverage('EcoShield Premium')}
            >
              <div className="cov-card-header">
                <div>
                  <h3 className="cov-card-title">EcoShield Premium</h3>
                  <span className="cov-card-tag cov-tag-emerald">Recommended • Peace of Mind</span>
                </div>
                <div className="cov-card-price text-emerald">+$18 / day</div>
              </div>
              <ul className="cov-card-benefits">
                <li><strong>$0 Zero-Deductible</strong> comprehensive & collision coverage</li>
                <li>Tire puncture, rim damage & windshield glass replacement</li>
                <li><strong>Unlimited On-Demand Mobile EV Recharging</strong> if battery runs low</li>
                <li>Priority digital key replacement and keyless lockout service</li>
              </ul>
              <div className="cov-select-footer">
                <span className="cov-footer-label text-emerald">
                  {selectedCoverage === 'EcoShield Premium' ? '✓ Selected Plan' : 'Click to select'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 4: CONFIRMATION & PAYMENT ================= */}
      {currentStep === 4 && (
        <div className="booking-stage-card">
          <div className="stage-header-block">
            <h2 className="stage-heading">Stage 4: Review Reservation & Confirm</h2>
            <p className="stage-sub">Review your itemized booking details before activating your digital key.</p>
          </div>

          <div className="booking-receipt-panel">
            <div className="receipt-line-item">
              <span className="receipt-lbl">Reserved Vehicle</span>
              <strong className="receipt-val">{chosenCar.name}</strong>
            </div>
            <div className="receipt-line-item">
              <span className="receipt-lbl">Pickup & Return Hub</span>
              <strong className="receipt-val">{selectedHub}</strong>
            </div>
            <div className="receipt-line-item">
              <span className="receipt-lbl">Reservation Schedule</span>
              <strong className="receipt-val">
                Thu, Oct {startDay} ({pickupTime}) → Sun, Oct {endDay} ({returnTime}) • {rentalDays} Days
              </strong>
            </div>
            <div className="receipt-line-item">
              <span className="receipt-lbl">Vehicle Rate</span>
              <span className="receipt-val">${dailyRate} × {rentalDays} Days = ${vehicleSubtotal}.00</span>
            </div>
            <div className="receipt-line-item">
              <span className="receipt-lbl">Protection Tier</span>
              <span className="receipt-val">{selectedCoverage} ({coverageDailyFee === 0 ? 'Included' : `+$${coverageSubtotal}.00`})</span>
            </div>
            <div className="receipt-line-item">
              <span className="receipt-lbl">Taxes & Environmental EV Fee</span>
              <span className="receipt-val">${estimatedTax}.00</span>
            </div>
            <div className="receipt-line-item receipt-total-row">
              <span className="receipt-total-lbl">Total Estimated Cost</span>
              <strong className="receipt-total-val text-emerald">${grandTotal}.00</strong>
            </div>
          </div>

          {/* Environmental Offset Banner */}
          <div className="booking-eco-impact-callout">
            <span className="eco-callout-icon">🌱</span>
            <div>
              <strong>100% Zero-Emission Road Trip</strong>
              <p>This reservation saves an estimated <strong>{(rentalDays * 5.4).toFixed(1)} kg of CO₂</strong> compared to an internal combustion engine vehicle.</p>
            </div>
          </div>

          {/* Digital Key Instant Activation Notice */}
          <div className="digital-key-pass-callout">
            <span className="key-callout-icon">🔑</span>
            <div>
              <strong>Instant Digital Mobile Key Activation</strong>
              <p>
                Clicking confirm immediately provisions your NFC contactless digital key into <strong>My Account</strong>. No rental counter lines or physical keyfob pickups needed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stepper Navigation Buttons */}
      <div className="booking-action-buttons-row">
        {currentStep > 1 ? (
          <button type="button" className="btn-booking-prev" onClick={handlePrev}>
            ← Back
          </button>
        ) : <div />}

        <button type="button" className="btn-booking-next" onClick={handleNext}>
          {currentStep === 1 && 'Continue to Vehicle Select →'}
          {currentStep === 2 && 'Continue to Coverage Tiers →'}
          {currentStep === 3 && 'Review & Confirm Reservation →'}
          {currentStep === 4 && 'Confirm Reservation & Get Digital Key 🎉'}
        </button>
      </div>
    </div>
  );
}
