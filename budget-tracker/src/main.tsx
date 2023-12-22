import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./AuthContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

if(!("BarcodeDetector" in window)){
    console.log("BarcodeDetector is not supported by this browser");
}else
{
    console.log("BarcodeDetector is supported by this browser")
}


if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(() => {
        if (Notification.permission !== 'granted') {
            // Request permission to show notifications
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                  console.log('permission granted')
                }
            });
        }
    });
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
          <AuthProvider>
              <App />
          </AuthProvider>
      </Router>

  </React.StrictMode>,
)
