import { useState } from 'react'
import BusinessWidget from './component/businessWidget';
import './App.css'

function App() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input />
        <br />
        <label>Password</label>
        <input />
        <br />
        <label>Business</label>
        <input type="radio" name="choose"/>
        <label>User</label>
        <input type="radio" name="choose" />
      </form>

    </>
  );
}

export default App
