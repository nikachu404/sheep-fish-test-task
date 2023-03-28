import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper is-centered">
      <div className="loader"></div>
    </div>
  );
};
