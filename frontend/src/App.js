import React, { useState } from 'react';
import RegistrationForm from './components/registerPage';
import LoginForm from './components/loginPage';
import HomePage from './components/homePage';

function App() {
  const [isLoginForm, setIsLoginForm] = useState(true); // Initially show login form
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user data

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="App">
      {!isLoggedIn && ( // Show login/register forms only if not logged in
        <>
          {isLoginForm ? (
            <LoginForm setLoggedInUser={setLoggedInUser} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <RegistrationForm />
          )}
          <p>
            {isLoginForm ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleForm}>
              {isLoginForm ? "Register" : "Login"}
            </button>
          </p>
        </>
      )}
      {isLoggedIn && <HomePage loggedInUser={loggedInUser} />} {/* Show HomePage if logged in */}
    </div>
  );
}

export default App;
