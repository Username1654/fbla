import "./Page.css";
// import businesses from "./example.json"
import Star from "./assets/Star";
export default function Page() {
  return (
    <div>
      <div className="header">
          { sessionStorage.username? <button onClick={()=>{window.location.href = "/business";}} className="login bsuiness">Add a business</button> : <p></p>}
      <h1>Biz-Finder</h1>
    { sessionStorage.username? <h2>Logged in as: {sessionStorage.username}</h2> : <button onClick={()=>{window.location.href = "/login";}} className="login">Login</button>}
      </div>
      <br />
      <div className="businesses">
        {/* {businesses.businesses.map((business) => (
          <div key={business.id} className="business">
            <div>
            <h2>{business.name}</h2>
    { <button onClick={()=>{window.location.href = "/login";}} className="login">Login</button>}
            <p>Industry: {business.industry}</p>
            <p>Location: {business.location}</p>
            </div>
            <div>
            <h2>Reviews</h2>
            {business.reviews.map((review, index) => (
              <div key={index} className="review">
                <p>Rating: {review.rating}⭐- </p>
                <p> - Comment: {review.comment}</p>
                </div>
           ))}
            </div>
            <Star/>
          </div>
        ))} */}
      </div>
    </div>
  );
}
