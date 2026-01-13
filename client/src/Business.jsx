import { useState } from 'react';
import bubbleImage from './assets/bubble.gif';
import "./business-styles.css"
export default function Login() {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [businessType, setBusinessType] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ businessName, description, businessType }),
      });
      const data = await res.json();

      alert(data.message);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  }


  return (
    <>
      <div id="bar">
        <h1>Business</h1>
        <button id="back-button" onClick={()=>{window.location.href = "/page";}}>Back</button>
      </div>
      <div id="main">
        <img src={bubbleImage} />

        <form id="login-form">
          <h3>Create a Business</h3>
          <label>Business Name:</label>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter Business Name"
            className="inp"
          />
          <br />
          <label>Description:</label>
          <input
            type="text"
            placeholder="Enter description"
            className="inp"
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />
          <label>Business Type</label>
          <input
            type="text"
            placeholder='Example: "Produce"'
            className="inp"
            onChange={(e) => setBusinessType(e.target.value)}
          />

          <br />
          <button onClick={handleSubmit}>Submit</button>
        </form>

        <img src={bubbleImage} alt="" />

      </div>

    </>
  );
}
