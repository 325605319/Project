import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import '../src/';
 import App from './App';
 import { Provider } from 'react-redux';
 import store from "./app/store"

// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/themes/lara-light-teal/theme.css';
// import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <PrimeReactProvider>
        <App/>
        </PrimeReactProvider>
         </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

