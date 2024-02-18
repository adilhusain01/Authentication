import React, { useState } from 'react';
import '../styles/style.css';

const LoginPage = ({ setLoggedInUser, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Set logged-in user state
      setLoggedInUser({
        username: formData.username,
        token: token
      });

      // Set isLoggedIn state to true
      setIsLoggedIn(true);

    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='form-container' onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className='btn'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
