import React, { useState, useEffect } from 'react';
import '../styles/style.css';

const HomePage = ({ loggedInUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details if token is present
      fetchUserDetails(token);
    } else {
      // Redirect to login page if token is not present
      window.location.href = '/login';
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Token verification error:', error);
      // Redirect to login page if token verification fails
      window.location.href = '/login';
    }
  };

  const handleSignOut = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {userData && (
        <div className='homepage'>
          {Object.entries(userData).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
          <button className='btn' onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
