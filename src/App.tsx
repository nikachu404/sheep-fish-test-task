import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="page">
      <Header />

      <div className="page__container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
