import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as SW from './registerServiceWorker'


ReactDOM.render(<App />, document.getElementById('root'));
SW.registerServiceWorker();
