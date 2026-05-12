import React from 'react';
import ReactDOM from 'react-dom/client';
// Remove BrowserRouter import from here
import { AuthProvider } from './hooks/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>      {/* Only AuthProvider, no Router */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);