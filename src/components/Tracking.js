import React from 'react';
import Navbar from './Navbar';
const Tracking = () => {
  return (
    <div>
        <Navbar />
      <h2>Real-Time Tracking</h2>
      <p>Here you can track your booked vehicle in real-time.</p>
      {/* Integrate a map or tracking interface here */}
    </div>
  );
};

export default Tracking;
