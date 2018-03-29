import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// window.USERURL = '/exApp/';
window.USERURL = 'http://localhost:3008/exApp/';
window.developing = true;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
