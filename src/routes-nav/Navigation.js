import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav">
        <li className="navbar-item">
          <NavLink className="nav-link" to="/getbooklist">
            Search
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="nav-link" to="/libraries">
            Your Libraries
          </NavLink>
        </li>
        <li className="navbar-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Log In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar">
      <Link className="navbar-a" to="/">
        Home
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
