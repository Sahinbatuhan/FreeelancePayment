import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployerPage from "./pages/EmployerPage";
import FreelancerPage from "./pages/FreelancerPage";

<Route path="/" element={<div style={{ padding: 24 }}>Welcome! Please select Employer or Freelancer page above.</div>} />


const App = () => {
  return (
    <BrowserRouter>
      <nav style={{ padding: 16 }}>
        <Link to="/employer" style={{ marginRight: 16 }}>Employer</Link>
        <Link to="/freelancer">Freelancer</Link>
      </nav>
      <Routes>
        <Route path="/employer" element={<EmployerPage />} />
        <Route path="/freelancer" element={<FreelancerPage />} />
        <Route path="/" element={<div>Welcome! Please select a page above.</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

