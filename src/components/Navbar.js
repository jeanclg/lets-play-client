import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export default function Navbar() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  return (
    <nav className="navbar navbar-dark bg-primary">
      <Link className="navbar-brand" to="/home">
        <p>Home</p>
      </Link>
      <Link className="navbar-brand" to="/forum">
        <p>Forum</p>
      </Link>
      <Link className="navbar-brand" to={`/messages/${loggedUser._id}`}>
        <p>Messages</p>
      </Link>

      <Dropdown>
        <Dropdown.Toggle variant="second" id="dropdown-basic">
          <img
            src={`https://ui-avatars.com/api/?name=${loggedInUser.user.name}&size=32&background=random`}
            className="rounded-circle"
            alt="Profile"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item to={`/user/${loggedUser._id}`} as={NavLink}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(event) => {
              event.preventDefault();
              // Fazendo processo de Logout
              setLoggedInUser({ user: {}, token: "" });
              localStorage.removeItem("loggedInUser");
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
}
