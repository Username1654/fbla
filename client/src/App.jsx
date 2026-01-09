import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/auth/Login";
import BusinessWidget from "./component/business/businessWidget";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
