// import Verify from './Verify.jsx'
// const isVerified = localStorage.getItem("verified") === true;
// createRoot(document.getElementById("root")).render(
//   isVerified ? (
//     <App />
//   ) : (
//     <Verify/>
//   )
// );

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
