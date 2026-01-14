import "./Page.css";

// import businesses from "./example.json"
import Star from "./assets/Star";
import { useEffect, useState } from "react";

export default function Page() {
  const [businesses, setBusinesses] = useState([]); // start as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/business");
        const data = await res.json();
        setBusinesses(data.businesses); // data should be an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getBusinesses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      {console.log("BUSINESSES", businesses)}
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
                            <img
                  className="cardImage"
                  src={`http://localhost:5000/uploads/${business.photos[0].filename}`}
                  alt={business.businessName}
                />
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

// NEED LOCATION
