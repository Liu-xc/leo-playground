import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
