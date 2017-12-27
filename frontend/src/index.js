import React from 'react';
import ReactDOM from 'react-dom';
import './es6-polyfill';
import 'babel-polyfill';
import CoreRouter from './components/router/CoreRouter';
import './static/css/bootstrap3_3_7.min.css';
import './static/css/font-awesome.min.css';
import './index.css';
ReactDOM.render(<CoreRouter />, document.getElementById('root'));
