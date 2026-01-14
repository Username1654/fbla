import "./Page.css";
import Star from "./assets/Star";
import { useEffect, useState } from "react";

export default function Page() {
  const [businesses, setBusinesses] = useState([]);
console.log("businesses:", businesses);
console.log("isArray:", Array.isArray(businesses));
console.log("type:", typeof businesses);
  useEffect(() => {
    fetch("http://localhost:5000/api/business")
      .then(res => res.json())
      .then(data => {
  setBusinesses(Array.isArray(data.businesses) ? data.businesses : []);
})
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="header">
        {sessionStorage.username ? (
          <button
            onClick={() => window.location.href = "/business"}
            className="login"
          >
            Add a business
          </button>
        ) : null}

        <h1>Biz-Finder</h1>

        {sessionStorage.username ? (
          <h2>Logged in as: {sessionStorage.username}</h2>
        ) : (
          <button
            onClick={() => window.location.href = "/login"}
            className="login"
          >
            Login
          </button>
        )}
      </div>

      <div className="businesses">
        {businesses.map((business) => (
          <div key={business.business_id} className="business">
            <h2>{business.business_name}</h2>
            <br />
            <ul>
           <li><p>- Description: {business.description}</p></li> 
           <li><p>- Type: {business.business_type}</p></li> 
            </ul>
            <h3>Reviews</h3>
            <div id="review">
              <p>Reviews in progress!</p>
            {business.reviews?.map((review, i) => (
              <div key={i} >
                
                <p>{review.rating} ⭐</p>
                <p>{review.comment}</p>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
