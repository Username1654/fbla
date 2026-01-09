import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/auth/Login.jsx";
// import BusinessWidget from "./component/business/businessWidget";
import Verify from "./component/auth/Verify.jsx";
import Page from "./Page.jsx";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path ="/page" element={<Page/>}/>
        <Route path="/" element={<Navigate to="/verify" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
