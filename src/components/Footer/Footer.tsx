import React, { FC } from 'react';

import './Footer.css';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        Data from{' '}
        <a
          className="footer-container__link"
          href="http://github.com/r-spacex/SpaceX-API"
          target="_blank"
          rel="noreferrer">
          SpaceX API
        </a>
      </div>
    </footer>
  );
};
