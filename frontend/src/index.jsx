import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/Store.jsx';

import './assets/scss/style.scss';
import config from './config';

import { SoftUIControllerProvider } from "./layout/context";

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>
);
