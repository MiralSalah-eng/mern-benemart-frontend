import React from 'react';
import ReactDOM from 'react-dom/client';
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
     />
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


