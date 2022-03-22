import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

import { initializeAPI } from './api';


initializeAPI();

ReactDOM.render(<App />, document.getElementById('root'));
