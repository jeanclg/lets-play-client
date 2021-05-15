import React from "react";
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
      <Link className="navbar-brand" to="/about">
        <p>About</p>
      </Link>
      <p className="navbar-brand">{loggedUser.name}</p>
      <Link
        className="navbar-brand"
        to="/"
        onClick={(event) => {
          event.preventDefault();
          // Fazendo processo de Logout
          setLoggedInUser({ user: {}, token: "" });
          localStorage.removeItem("loggedInUser");
        }}
      >
        <p>Logout</p>
      </Link>
    </nav>
  );
}
