import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// window.USERURL = 'http://111.231.237.73:8080/hr_examination_user/';
window.USERURL = 'http://localhost:3002/hr_examination_user/';
window.PLATFORMURL = 'http://localhost:3002/hr_examination_platform/';
window.ZSSYURL = 'http://localhost:3002/hr_examination_zssy/';
window.developing = true;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
