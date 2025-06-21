// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// 👇 Import the AuthProvider
import { AuthProvider } from './hooks/useAuth';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>  {/* 👈 Wrap App here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
