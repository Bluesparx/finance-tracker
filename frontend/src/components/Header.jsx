import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleShowLogin = () => {
    navigate("/login");
  }

  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Navbar className="navbarCSS" variant="dark" style={{position: 'relative', zIndex: 2 }}>
          <Navbar.Brand href="/" className="text-white navTitle">FinYojak</Navbar.Brand>
          <Nav>
            {user ? (
              <Button variant="primary" onClick={handleShowLogout} className="ml-2">Logout</Button>
            ) : (
              // <Button variant="primary" onClick={handleShowLogin} className="ml-2">Login</Button>
              <></>
            )}
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
