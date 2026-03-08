import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContent from './AppContent.jsx';
import { DemoProvider } from './context/DemoContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DemoProvider>
      <AppContent />
    </DemoProvider>
  </React.StrictMode>,
);
