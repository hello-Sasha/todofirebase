import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

import { initializeAPI } from './api';
import {AuthContextProvider} from "./features/AuthContextProvider";



const firebaseApp = initializeAPI();
ReactDOM.render(
    <AuthContextProvider firebaseApp={firebaseApp}>
      <App />
    </AuthContextProvider>,
  document.getElementById('root')
);
