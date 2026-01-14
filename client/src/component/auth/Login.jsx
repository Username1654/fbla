import { useState } from 'react';
import bubbleImage from '../../assets/bubble.gif';
import styles from "./Login.module.css"
export default function Login() {
  const [username, setUsername] = useState("");
  // const [purpose, setPurpose] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(password)
      const res = await fetch("http://localhost:5000/api/login/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("username", username);
       alert(data.message)

        location.replace("/page");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  }


  return (
    <>
      <div id="bar">
        <h1>Login</h1>
        <button id="back-button" onClick={()=>{window.location.href = "/page";}}>Back</button>
      </div>
      <div id="main" className="main">
        <img src={bubbleImage} className={styles.bubbleImage}/>

        <form id="login-form">
          <h3>Login or Sign Up</h3>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className={styles.inp}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            className={styles.inp}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button onClick={handleSubmit} style={{backgroundColor:"green"}}>Submit</button>
        </form>

        <img src={bubbleImage} className={styles.bubbleImage} alt="" />

      </div>

    </>
  );
}
