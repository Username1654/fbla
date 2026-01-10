import "./Page.css"
let mock = {
    business1: {
        location:""
    }
}
export default function page() {
    return (
      <div id="top">
        <h1 id="title">Small Businesses</h1>
        <button onClick={() => window.location.replace("http://localhost:5173/login")} id="login">
          Login
        </button>
        </div>


    );
}
