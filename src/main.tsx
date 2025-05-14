import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import { Toaster } from './components/ui/toaster.tsx';
import { Environment } from './global';

if (import.meta.env.MODE === 'mock') {
  import('./mocks/browser').then(({ worker }) => {
    // Start the mocking when the app is running in development

    worker.start();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);
