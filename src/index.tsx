import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { App } from 'App';

import 'normalize.css';
import 'index.css';
import 'typeface-space-mono';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
