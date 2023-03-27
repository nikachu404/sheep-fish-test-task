import React from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <nav>
        <ul className="header__nav-list">
          <li className="is-size-4-desktop header__nav-item">
            <Link to="/products" className="has-text-dark has-text-weight-semibold">Products</Link>
          </li>

          <li className="is-size-4-desktop header__nav-item">
            <Link to="/add" className="has-text-dark has-text-weight-semibold">Add product</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
