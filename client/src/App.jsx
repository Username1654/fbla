import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/auth/Login";
import Verify from "./component/auth/Verify";
import Page from "./Page";
import Business from "./Business";
function App() {
  return (
    <BrowserRouter>
      <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/page" element={<Page />} />
          <Route path="/auth" element={<Verify />} />
          <Route path="/business" element={<Business />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
