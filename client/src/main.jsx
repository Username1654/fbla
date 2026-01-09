import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Verify from './Verify.jsx'
const isVerified = localStorage.getItem("verified") === true;
createRoot(document.getElementById("root")).render(
  isVerified ? (
    <App />
  ) : (
    <Verify/>
  )

);