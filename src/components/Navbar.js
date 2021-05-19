import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import Logo from "../images/Letsplaynav2.png";

export default function NavbarComponent() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#00adb5" }}
    >
      <Navbar.Brand>
        <Link className="navbar-brand" to="/home">
          <img
            src={Logo}
            width="60"
            height="auto"
            className="d-inline-block align-top"
            alt="logo img"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link
              to={`/messages/${loggedUser._id}`}
              style={{ color: "#eeeeee", textDecoration: "none" }}
            >
              Messages
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/forum"
              style={{ color: "#eeeeee", textDecoration: "none" }}
            >
              Forum
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Dropdown className="mr-5">
          <Dropdown.Toggle
            className="mr-5"
            variant="second"
            id="dropdown-basic"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${loggedInUser.user.name}&size=32&background=random`}
              className="rounded-circle"
              alt="Profile"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ backgroundColor: "#00adb5", color: "#eeeeee" }}
          >
            <Dropdown.Item
              to={`/user/${loggedUser._id}`}
              as={NavLink}
              style={{ color: "#eeeeee" }}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(event) => {
                event.preventDefault();
                // Fazendo processo de Logout
                setLoggedInUser({ user: {}, token: "" });
                localStorage.removeItem("loggedInUser");
              }}
              style={{ color: "#eeeeee" }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
}
