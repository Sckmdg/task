import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import App from './containers/App';
/**
*Render our main container with his children
*Use provider to pass data throw app
*/
const store = configureStore();
setTimeout(console.log("Store State", store.getState()), 4000);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)