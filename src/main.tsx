import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
