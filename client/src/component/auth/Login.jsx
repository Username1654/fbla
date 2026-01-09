import { useState } from 'react';
import bubbleImage from '../../assets/bubble.gif';

export default function Login() {
  const [username, setUsername] = useState("");
  const [purpose, setPurpose] = useState("");
  const [password, setPassword] = useState("");
  function handleEvents(value) {
    setUsername(value);
    setPassword(value);
    console.log(password);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      password,
      username,
    };
    console.log(data);
    console.log(password);
    console.log("Submitted username:", username);
    fetch("http://localhost:5174/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("loggedIn", true);
      })
      .catch((error) => {
        console.error("Error:", error);
        localStorage.setItem("verified", false);
      });
  }
  return (
    <>
      <div id="bar">
        <h1>Login</h1>
      </div>
      <div id="main">
        <img src={bubbleImage} />

        <form id="login-form">
          <h3>Login or Sign Up</h3>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="inp"
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            className="inp"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <img src={bubbleImage} alt="" />
      </div>
    </>
  );
}
