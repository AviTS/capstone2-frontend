import React, { useContext } from 'react';
import BookAppApi from './api';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import UserContext from './auth/UserContext';
import { Link } from 'react-router-dom';
import LibraryForm from './libraries/LibraryForm';
import LibraryList from './libraries/LibraryList';

function Homepage({ login, signup }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <h1>Homepage</h1>
      <div className="container text-center">
        {currentUser ? (
          <h2>Welcome Back, {currentUser.username}!</h2>
        ) : (
          <p>
            <Link className="btn btn-primary" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
      <div>
        <SignupForm signup={signup} />
      </div>
      <div>
        <LoginForm login={login} />
      </div>
    </div>
  );
}

export default Homepage;
