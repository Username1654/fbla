import "./Page.css";
import { useState, useEffect } from "react";
// import businesses from "./example.json"
import Star from "./assets/Star";
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
            onClick={() => {
              window.location.href = "/business";
            }}
            className="login bsuiness"
          >
            Add a business
          </button>
        ) : (
          <p></p>
        )}
        <h1>Biz-Finder</h1>
        {sessionStorage.username ? (
          <h2>Logged in as: {sessionStorage.username}</h2>
        ) : (
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="login"
          >
            Login
          </button>
        )}
      </div>
      <br />
      <div className="businesses">
        {businesses.map((business) => (
          <div key={business.businessId} className="business">

              {business.photos && business.photos.length > 0 && (
                <img
                  className="cardImage"
                  src={`http://localhost:5000/uploads/${business.photos[0].filename}`}
                  alt={business.businessName}
                />
              )}
              <h2>{business.businessName}</h2>

            {/* <Star/> */}
          </div>
        ))}
      </div>
    </div>
  );
}

// NEED LOCATION
