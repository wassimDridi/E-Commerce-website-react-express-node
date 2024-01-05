import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import BeforApp from './BeforApp'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <BeforApp />
    </Router>
    
  </React.StrictMode>,
)
