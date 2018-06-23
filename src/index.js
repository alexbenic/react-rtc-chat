import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css'
import 'tachyons'
import 'typeface-open-sans'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
