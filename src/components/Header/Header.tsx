import React from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={
              ({ isActive }) => classNames(
                'navbar-item has-text-dark has-text-weight-semibold',
                { 'header--is-active': isActive }
              )
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/add"
            className={
              ({ isActive }) => classNames(
                'navbar-item has-text-dark has-text-weight-semibold',
                { 'header--is-active': isActive }
              )
            }
          >
            Add product
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
