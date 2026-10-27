import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ selectedHub }) {
  return (
    <header className="header">
      <Link to="/" className="brand-wrap">
        <div className="logo-symbol">🌱</div>
        <div>
          <div className="brand-title">EcoDrive</div>
          <div className="brand-tagline">100% Zero-Emission Rental</div>
        </div>
      </Link>

      <nav className="nav-menu">
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
    </header>
  );
}
