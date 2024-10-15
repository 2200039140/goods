import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Logistics Platform</h2>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
        <li style={styles.navItem}><Link to="/booking" style={styles.navLink}>Book a Vehicle</Link></li>
        <li style={styles.navItem}><Link to="/tracking" style={styles.navLink}>Track Vehicle</Link></li>
        <li style={styles.navItem}><Link to="/price-estimation" style={styles.navLink}>Price Estimation</Link></li>
        <li style={styles.navItem}><Link to="/" style={styles.navLink}>Logout</Link></li>
      </ul>
    </nav>
  );
};

// Inline CSS styles
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C3E50', // Dark blue background
    color: 'white', // White text
    padding: '1rem 2rem', // Padding for the navbar
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow
  },
  title: {
    margin: 0, // Remove default margin
    fontSize: '24px', // Font size for the title
  },
  navList: {
    listStyleType: 'none', // Remove bullet points
    margin: 0, // Remove default margin
    padding: 0, // Remove default padding
    display: 'flex', // Display list items in a row
  },
  navItem: {
    marginLeft: '20px', // Space between menu items
  },
  navLink: {
    textDecoration: 'none', // Remove underline from links
    color: 'white', // White link color
    padding: '8px 16px', // Padding for the links
    borderRadius: '4px', // Rounded corners
    transition: 'background-color 0.3s', // Transition for background color
  },
};



export default Navbar;
