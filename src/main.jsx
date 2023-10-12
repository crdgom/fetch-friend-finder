import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <StrictMode>
    <App />
    </StrictMode>
)
