import React from 'react';
import ReactDOM from 'react-dom';

// Styles from template
// import dashkit styles
import './assets/fonts/feather/feather.css';
import './assets/scss/theme.scss';

// Styles from app
import './index.scss';
import App from './App';

import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/jquery-mask-plugin/dist/jquery.mask.min';

/* eslint-disable-next-line */
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
