import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import StylesProvider from '@material-ui/styles/StylesProvider';

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <StylesProvider>
      <App />
    </StylesProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
