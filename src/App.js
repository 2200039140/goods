import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register'; // Adjust path if needed
import Login from './components/Login';       // Adjust path if needed
import UserDashboard from './components/UserDashboard'; // Adjust path if needed
import Booking from './components/Booking';    // Adjust path if needed
import Tracking from './components/Tracking';  // Adjust path if needed
import PriceEstimation from './components/PriceEstimation'; // Adjust path if needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/price-estimation" element={<PriceEstimation />} />
      </Routes>
    </Router>
  );
};

export default App;
