import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import App from './containers/App';
const store = configureStore();
setTimeout(console.log("Store State", store.getState()), 2000);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)