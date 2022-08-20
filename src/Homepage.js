import React, { useContext } from 'react';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import UserContext from './auth/UserContext';
import './Homepage.css';

function Homepage({ login, signup }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <div className="container text-center">
        {currentUser ? (
          <div>
            <h2>Welcome Back, {currentUser.username}!</h2>
            <p>
              Welcome to my Capstone Project! You can start searching for books,
              however, you’ll need to create your own library before you attempt
              to add a book. Once a book has been added to a library, you can
              rate it by clicking on the corresponding star.
            </p>
          </div>
        ) : (
          <div>
            <p>
              Welcome to my Capstone Project! Please begin by signing up with a
              username and password. Once you’ve signed up, head over to the
              ‘Search’ or ‘Your Libraries’ section. You can start searching for
              books, however, you’ll need to create your own library before you
              attempt to add a book. Once a book has been added to a library,
              you can rate it by clicking on the corresponding star.
            </p>
            {currentUser ? null : <LoginForm login={login} />}
            <div>{currentUser ? null : <SignupForm signup={signup} />}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
