import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './containers/App';

const history = createBrowserHistory();

ReactDOM.hydrate(
  <Router history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>,
  document.getElementById('app'),
);
