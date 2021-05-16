import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

import ironhack from "../components/ironhack-logo.png";
import Github from "../components/Github_logo-removebg-preview.png";

export default function Footer() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  return (
    <footer
      className="navbar navbar-static-bottom navbar-light justify-content-center"
      style={{ backgroundColor: "#1b1a17" }}
    >
      <div>
        <div className="d-flex align-items-center">
          <h4 style={{ color: "#F0E3CA" }}>Contact us:</h4>

          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-brand"
              href="https://github.com/FelipeBorges1991"
            >
              <img
                src={Github}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="logo img"
              />
            </a>
            <h6 style={{ color: "#FF8303" }}>Felipe Borges</h6>
          </div>

          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-brand"
              href="https://github.com/jeanclg"
            >
              <img
                src={Github}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="logo Github"
              />
            </a>
            <h6 style={{ color: "#FF8303", paddingRight: "15px" }}>
              Jean Garcia
            </h6>
          </div>

          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-brand"
              href="https://github.com/rmozer13811"
            >
              <img
                src={Github}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="logo img"
              />
            </a>
            <h6 style={{ color: "#FF8303" }}>Richard Mozer</h6>
          </div>
        </div>
      </div>
    </footer>
  );
}
