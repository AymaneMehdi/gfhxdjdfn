import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './views/posts/redux/Store.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense>
    <Toaster
      position="top-center" 
    />
    <BrowserRouter>
    <Provider store = {store}>
    <App />
  </Provider>
    </BrowserRouter>
  </Suspense>,
);
