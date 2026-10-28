import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ selectedHub }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="brand-wrap">
        <div className="logo-symbol">🌱</div>
        <div>
          <div className="brand-title">EcoDrive</div>
          <div className="brand-tagline">100% Zero-Emission Rental</div>
        </div>
      </Link>

      <div
        className={`nav-layout ${menuOpen ? 'is-open' : ''}`}
        id="site-navigation"
        onClick={() => setMenuOpen(false)}
      >
        <nav className="nav-menu" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/fleet"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Fleet Catalog
          </NavLink>
          <NavLink
            to="/sustainability"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Green Impact
          </NavLink>
        </nav>

        <NavLink
          to="/account"
          className={({ isActive }) => `nav-link account-link ${isActive ? 'active' : ''}`}
        >
          My Account
        </NavLink>
      </div>

      <button
        type="button"
        className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
