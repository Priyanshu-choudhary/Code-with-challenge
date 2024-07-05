import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '841173723405-l32987759m0uos2un111iunl1ipsp0sr.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <App />
    </GoogleOAuthProvider>,
  // {/* </React.StrictMode> */}

);
