import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <Navbar>
        <Container fluid="false">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/getbooklist">Search</Nav.Link>

            <Nav.Link href="/libraries">Your Libraries</Nav.Link>

            <Nav.Link href="/" onClick={logout}>
              Log out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }

  function loggedOutNav() {
    return (
      <Navbar>
        <Container>
          <Nav>
            <Nav.Link href="/">Log In</Nav.Link>
            <Nav.Link href="/">Sign up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }

  return <div>{currentUser ? loggedInNav() : loggedOutNav()}</div>;
}

export default Navigation;
