import React from 'react';
import BookAppApi from './api';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';

function Homepage({ login, signup }) {
  return (
    <div>
      <h1>This is working!</h1>
      <h3>Temp text</h3>
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
