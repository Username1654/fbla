import "./Page.css";

// import businesses from "./example.json"
import Star from "./assets/Star";
import { useEffect, useState } from "react";

export default function Page() {
  const [businesses, setBusinesses] = useState([]); // start as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviewText, setReviewText] = useState("");

  async function handleReviewSubmit(e, businessId) {
    e.preventDefault();
    try {
      if (!reviewText) {
        alert("Must have a review to submit.");
        return;
      }
      const reviewUser = sessionStorage.getItem('username');
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({businessId, reviewUser, rating: 5, comment: reviewText}),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("username", username);
        alert(data.message);

        location.replace("/page");
      } else {
        alert(data.message);
      }
    } catch (err) {}
  }

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
            onClick={() => (window.location.href = "/business")}
            className="login buttonTransition"
          >
            Add a business
          </button>
        ) : null}

        <h1>Biz-Finder</h1>

        {sessionStorage.username ? (
          <h2>Logged in as: {sessionStorage.username}</h2>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="login buttonTransition"
          >
            Login
          </button>
        )}
      </div>

      <div className="businesses">
        {businesses.map((business) => (
          <div key={business.businessId} className="business">
            <img
              className="cardImage"
              src={`http://localhost:5000/uploads/${business.photos[0].filename}`}
              alt={business.businessName}
            />
            <h2>{business.businessName}</h2>
            <br />
            <p>Industry: {business.businessType}</p>
            <h3>Reviews</h3>
            <div className="review">
              {business.reviews?.map((review, i) => (
                <div key={i} className="reviewCommentDisplay">
                  <p>{review.rating} ⭐</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            <form className="reviewForm" onSubmit={(e) => handleReviewSubmit(e, business.businessId)}>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Type a review!"
                rows={5}
                className="reviewTextArea"
              />
              <button type="submit" class="submitButton">Submit Review</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

// NEED LOCATION
