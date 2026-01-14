import { useState } from "react";
import bubbleImage from "./assets/bubble.gif";
import "./business-styles.css";
export default function Login() {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [photos, setPhotos] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!businessName || !description || !businessType || !photos) {
        alert("Fill out all boxes.");
        return;
      }
      let formData = new FormData();
      formData.append("businessName", businessName);
      formData.append("description", description);
      formData.append("businessType", businessType);
      photos.forEach(p => formData.append("photos", p));
      const res = await fetch("http://localhost:5000/api/business", {
        method: "POST",
        body: formData
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
      {console.log(photos)}
      <div id="bar">
        <h1>Business</h1>
        <button
        className="button"
          id="back-button"
          onClick={() => {
            window.location.href = "/page";
          }}
        >
          Back
        </button>
      </div>
      <div id="main">
        <img src={bubbleImage} className="bubbleImage"/>

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

          <label>Upload Photos</label>

          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              files.forEach((file) => {
                if (photos.length >= 20) {
                  alert("Maximum 20 photos allowed", "error");
                  return;
                }

                if (file.size > 5 * 1024 * 1024) {
                  alert(
                    `${file.name} is too large. Maximum 5MB per image.`,
                    "error"
                  );
                  return;
                }

                const allowedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/webp",
                ];
                if (!allowedTypes.includes(file.type)) {
                  alert(
                    `${file.name} is not a supported image format.`,
                    "error"
                  );
                  return;
                }

                setPhotos((prev) => [...prev, file]);
              });
              e.target.value = "";
            }}
          ></input>
          <div id="photoPreview" className="photo-preview"></div>

          <button onClick={handleSubmit} className="button">Submit</button>
        </form>

        <img src={bubbleImage} alt="" className="bubbleImage"/>
      </div>
    </>
  );
}
