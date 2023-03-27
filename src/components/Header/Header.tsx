import React from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <nav>
        <ul className="header__nav-list">
          <li className="has-text-weight-bold is-size-4-desktop has-text-dark">
            <NavLink to="/products">Products</NavLink>
          </li>

          <li className="has-text-weight-bold is-size-4-desktop has-text-dark">
            <NavLink to="/add">Add product</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
