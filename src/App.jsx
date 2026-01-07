import { useState } from 'react'

import './App.css'

function App() {
  fetch('http://localhost:5000/').then(res => res.text("text")).then(data => {
    console.log(data);
  });
 

  return (
    <>
   </>
  )
}

export default App
