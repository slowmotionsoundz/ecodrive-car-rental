import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fleetData, categories } from '../data/fleetData';

export default function FleetPage({ onReserveCar, activeRentalCar }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showAll, setShowAll] = useState(false);

  const fleetRanges = fleetData.map((car) => parseInt(car.range));
  const minAvailableRange = Math.floor(Math.min(...fleetRanges) / 10) * 10;
  const maxAvailableRange = Math.ceil(Math.max(...fleetRanges) / 10) * 10;
  const [minRange, setMinRange] = useState(minAvailableRange);

  const rangeFilteredFleet = fleetData.filter((car) => parseInt(car.range) >= minRange);

  const filteredFleet = rangeFilteredFleet
    .filter((car) => filterCategory === 'all' || car.categories.includes(filterCategory))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'range') return parseInt(b.range) - parseInt(a.range);
      return 0;
    });
  const visibleFleet = showAll ? filteredFleet : filteredFleet.slice(0, 4);

  return (
    <div className="page-container">
      {/* Fleet Header */}
      <section className="page-header">
        <div className="hero-pill">
          <span>⚡ 100% Guaranteed EV Fleet</span>
        </div>
        <h1 className="page-title">Available Zero-Emission Electric Vehicles</h1>
        <p className="page-description">
          Every vehicle in our fleet is fully electric, charged with 100% renewable energy, and unlocked seamlessly via your phone.
        </p>

        {/* Filter & Controls Bar */}
        <div className="fleet-filter-bar">
          <div className="filter-chips-group">
            <button
              className={`filter-chip ${filterCategory === 'all' ? 'chip-active' : ''}`}
              onClick={() => setFilterCategory('all')}
            >
              All Models ({rangeFilteredFleet.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-chip ${filterCategory === category ? 'chip-active' : ''}`}
                onClick={() => setFilterCategory(category)}
              >
                {category} ({rangeFilteredFleet.filter((car) => car.categories.includes(category)).length})
              </button>
            ))}
          </div>

          <div className="sort-controls">
            <div className="range-slider-wrap">
              <label>Min Range: <strong>{minRange} mi</strong></label>
              <input
                type="range"
                min={minAvailableRange}
                max={maxAvailableRange}
                step="10"
                value={minRange}
                onChange={(e) => setMinRange(Number(e.target.value))}
                className="range-input"
              />
            </div>

            <div className="sort-select-wrap">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="range">Longest Range</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Catalog Grid */}
      <section className="fleet-catalog-section">
        <div className="fleet-cards-grid">
          {filteredFleet.length === 0 ? (
            <div className="fleet-empty-state" role="status">
              <h2>No vehicles match these filters</h2>
              <p>Lower the minimum range or choose another category.</p>
            </div>
          ) : visibleFleet.map((car) => (
            <div key={car.id} className="fleet-card fleet-page-card">
              <div className="card-image-wrapper">
                <Link to={`/fleet/${car.id}`}>
                  <img src={car.image} alt={car.name} className="car-preview-img" loading="lazy" />
                </Link>
                <span
                  className="card-category-badge"
                  style={{ backgroundColor: car.badgeColor, color: '#0d2818' }}
                >
                  {car.category}
                </span>
                <div className="card-quick-specs">
                  <span>{car.drive}</span>
                  <span>•</span>
                  <span>{car.acceleration}</span>
                </div>
              </div>

              <div className="card-body">
                <div className="card-title-row">
                  <Link to={`/fleet/${car.id}`}>
                    <h3 className="car-model-name">{car.name}</h3>
                  </Link>
                  <span className="eco-verified-tag">🌱 Zero Tailpipe</span>
                </div>

                <p className="card-desc-snippet">{car.description}</p>

                <div className="specs-telemetry-grid">
                  <div className="spec-box">
                    <span className="spec-title">Range</span>
                    <span className="spec-val">🔋 {car.range}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-title">Top Speed</span>
                    <span className="spec-val">⚡ {car.topSpeed}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-title">Fast Charging</span>
                    <span className="spec-val">⚡ {car.chargingSpeed.split(' ')[0]} kW</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-title">Battery Cap.</span>
                    <span className="spec-val">🔌 {car.batteryCapacity}</span>
                  </div>
                </div>

                <div className="card-action-bar">
                  <div className="price-container">
                    <span className="currency-val">${car.price}</span>
                    <span className="period-label">/ day</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/fleet/${car.id}`} className="btn-details-link">
                      Vehicle Details
                    </Link>
                    <button
                      className={`btn-reserve ${activeRentalCar === car.name ? 'btn-selected' : ''}`}
                      onClick={() => onReserveCar(car)}
                    >
                      {activeRentalCar === car.name ? '✓ Selected' : 'Reserve'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!showAll && filteredFleet.length > 4 && (
          <button className="fleet-show-all-button" onClick={() => setShowAll(true)}>
            Show All
          </button>
        )}
      </section>
    </div>
  );
}
