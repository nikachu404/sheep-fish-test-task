import React from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/products" className="navbar-item has-text-dark has-text-weight-semibold">
            Products
          </NavLink>

          <NavLink to="/add" className=" navbar-item has-text-dark has-text-weight-semibold">
            Add product
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
