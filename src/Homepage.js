import React, { useContext } from 'react';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import UserContext from './auth/UserContext';
import { Link } from 'react-router-dom';

function Homepage({ login, signup }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <div className="container text-center">
        {currentUser ? (
          <h2>Welcome Back, {currentUser.username}!</h2>
        ) : (
          <div>
            {currentUser ? null : <LoginForm login={login} />}
            <div>{currentUser ? null : <SignupForm signup={signup} />}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
