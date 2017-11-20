import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import ReactDOM from 'react-dom';

import './style.css';
import 'antd/dist/antd.css'
import App from './App.js';

ReactDOM.render(<App />	, 
	document.getElementById('root')
);
