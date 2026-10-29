import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCarById, hubsData } from '../data/fleetData';

export default function VehicleDetailPage({
  selectedHub,
  setSelectedHub,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  onReserveCar,
  activeRentalCar
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = getCarById(id);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!car) {
    return (
      <div className="page-container error-page">
        <h2>Vehicle Not Found</h2>
        <p>The requested EV is currently not in our catalog.</p>
        <Link to="/fleet" className="btn-primary-large">
          Back to Fleet Catalog
        </Link>
      </div>
    );
  }

  // Calculate rental days
  const pick = new Date(pickupDate);
  const ret = new Date(returnDate);
  const diffTime = Math.max(ret - pick, 86400000);
  const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const subtotal = rentalDays * car.price;
  const estimatedCarbonSaved = (rentalDays * 65 * 0.404).toFixed(1); // approx 65 miles/day * 0.404 kg CO2/mi

  const handleConfirmReservation = () => {
    onReserveCar(car);
    navigate('/booking', { state: { preselectedCar: car, fromDetail: true } });
  };

  return (
    <div className="page-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/fleet">Fleet Catalog</Link>
        <span>/</span>
        <span className="breadcrumb-current">{car.name}</span>
      </div>

      <div className="vehicle-detail-layout">
        {/* Left Column: Car Showcase & Technical Specs */}
        <div className="vehicle-showcase-column">
          <div className="showcase-image-card">
            <img src={car.image} alt={car.name} className="detail-hero-image" />
            <div className="showcase-floating-badge" style={{ backgroundColor: car.badgeColor, color: '#0d2818' }}>
              {car.category}
            </div>
            <div className="showcase-status-badge">
              <span className="live-indicator"></span>
              <span>Available for Instant Pickup at {selectedHub.split(' ')[0]}</span>
            </div>
          </div>

          <div className="vehicle-info-block">
            <h1 className="detail-car-title">{car.name}</h1>
            <p className="detail-car-description">{car.description}</p>
          </div>

          {/* Technical Telemetry Grid */}
          <div className="detail-specs-card">
            <h3 className="specs-card-title">⚡ Powertrain & Telemetry Specifications</h3>
            <div className="specs-detail-grid">
              <div className="spec-metric-card">
                <span className="spec-metric-icon">🔋</span>
                <div>
                  <span className="spec-metric-label">EPA Estimated Range</span>
                  <strong className="spec-metric-value">{car.range}</strong>
                </div>
              </div>

              <div className="spec-metric-card">
                <span className="spec-metric-icon">🚀</span>
                <div>
                  <span className="spec-metric-label">0 - 60 mph Acceleration</span>
                  <strong className="spec-metric-value">{car.acceleration}</strong>
                </div>
              </div>

              <div className="spec-metric-card">
                <span className="spec-metric-icon">⚡</span>
                <div>
                  <span className="spec-metric-label">Ultra-Fast DC Charging</span>
                  <strong className="spec-metric-value">{car.chargingSpeed}</strong>
                </div>
              </div>

              <div className="spec-metric-card">
                <span className="spec-metric-icon">🔌</span>
                <div>
                  <span className="spec-metric-label">Battery Pack Capacity</span>
                  <strong className="spec-metric-value">{car.batteryCapacity}</strong>
                </div>
              </div>

              <div className="spec-metric-card">
                <span className="spec-metric-icon">🛞</span>
                <div>
                  <span className="spec-metric-label">Drivetrain Architecture</span>
                  <strong className="spec-metric-value">{car.drive}</strong>
                </div>
              </div>

              <div className="spec-metric-card">
                <span className="spec-metric-icon">🧳</span>
                <div>
                  <span className="spec-metric-label">Cargo Capacity</span>
                  <strong className="spec-metric-value">{car.luggage}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Included Features */}
          <div className="features-included-card">
            <h3 className="specs-card-title">✨ Included with Every EcoDrive Rental</h3>
            <ul className="features-list">
              {car.features.map((feat, idx) => (
                <li key={idx} className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="booking-sidebar-column">
          <div className="sticky-booking-card">
            <div className="booking-card-header">
              <div>
                <span className="booking-rate">${car.price}</span>
                <span className="booking-unit"> / day</span>
              </div>
              <span className="badge-ev-pill">100% Zero-Emission</span>
            </div>

            {bookingConfirmed ? (
              <div className="booking-success-box">
                <div className="success-icon">🎉</div>
                <h3>Reservation Confirmed!</h3>
                <p>
                  Your <strong>{car.name}</strong> is reserved at <strong>{selectedHub}</strong>.
                </p>
                <div className="digital-key-pass">
                  <span className="pass-chip">📱 Mobile Digital Key Ready</span>
                  <p>Walk straight to spot #14 and unlock with your phone.</p>
                </div>
                <button
                  className="btn-primary-large"
                  onClick={() => navigate('/account')}
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  Go to Digital Key & Account →
                </button>
              </div>
            ) : (
              <div className="booking-form-wrap">
                <div className="booking-field">
                  <label className="field-label">📍 Pickup & Return Hub</label>
                  <select
                    className="search-select"
                    value={selectedHub}
                    onChange={(e) => setSelectedHub(e.target.value)}
                  >
                    {hubsData.map((hub) => (
                      <option key={hub.id} value={hub.name}>
                        {hub.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="booking-field">
                  <label className="field-label">📅 Pick-up Date & Time</label>
                  <input
                    type="datetime-local"
                    className="search-input"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div className="booking-field">
                  <label className="field-label">🏁 Return Date & Time</label>
                  <input
                    type="datetime-local"
                    className="search-input"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>${car.price} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Complimentary Supercharging</span>
                    <span className="text-emerald font-bold">FREE</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Carbon Offset Certification</span>
                    <span className="text-emerald font-bold">FREE</span>
                  </div>
                  <div className="breakdown-divider"></div>
                  <div className="breakdown-row total-row">
                    <span>Total Rate</span>
                    <span className="total-amount">${subtotal}</span>
                  </div>
                </div>

                {/* Carbon Offset Callout */}
                <div className="booking-green-benefit">
                  <span>🌱</span>
                  <div>
                    <strong>{estimatedCarbonSaved} kg CO₂ Prevented</strong>
                    <p>100% clean solar-powered drive vs gasoline car</p>
                  </div>
                </div>

                <button
                  className="btn-book-now-large"
                  onClick={handleConfirmReservation}
                >
                  Confirm & Reserve {car.name.split(' ')[0]}
                </button>

                <p className="booking-guarantee-note">
                  🔒 No cancellation fee up to 24h before pick-up. Contactless key pickup on mobile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
