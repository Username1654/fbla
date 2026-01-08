import { useState } from 'react'
import BusinessWidget from './component/businessWidget';
import './App.css'
import bubbleImage from './assets/bubble.gif';
function App() {
 
 const [username, setUsername] = useState('');
  function handleEvents(value) {
    setUsername(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted username:', username);
  }
  return (
    <>
    <div id="bar">
      <h1>Login</h1>
      </div>
      <div id="main">
      <img src={bubbleImage} />

      <form id="login-form"  onSubmit={handleSubmit}>
        <h3>Login or Sign Up</h3>
        <label>Username:</label>
        <input value={username} onChange={(e) => handleEvents(e.target.value)} placeholder="Enter username" className='inp'/>
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Enter password" className='inp' />
        <br />

        <h3>Purpose?</h3>
<label className="radio">
  <input type="radio" name="choose" />
 - Business
</label>

<label className="radio">
  <input type="radio" name="choose" />
  - User
</label>
        <br/>
        <button type="submit">Submit</button>
      </form>
      <img src={bubbleImage} alt="" />
      </div>

    </>
  );
}

export default App
