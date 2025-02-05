import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("env: ", process.env.REACT_APP_API_BASE_URL)
root.render(
 
    <AuthProvider>
      <App />
    </AuthProvider>


);
