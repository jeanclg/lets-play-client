import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import "../assets/styles/index.css";

import ironhack from "../images/ironhack-logo.png";
import Github from "../images/Github_logo-removebg-preview.png";

export default function Footer() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  return (
    <footer
      className="navbar navbar-static-bottom navbar-light d-flex flex-column align-content-center"
      style={{ backgroundColor: "#00adb5", color: "#eeeeee" }}
    >
      <div className="d-flex flex-column justify-content-start">
        <h4 style={{ color: "#eeeeee" }}>Contact us:</h4>
      </div>

      <div className="d-flex vw-100 justify-content-around text-center">
        <div className="text-center">
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
          <h6 style={{ color: "#eeeeee" }}>Felipe Borges</h6>
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
          <h6 style={{ color: "#eeeeee" }}>Jean Garcia</h6>
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
          <h6 style={{ color: "#eeeeee" }}>Richard Mozer</h6>
        </div>
      </div>
      <hr style={{ color: "#eeeeee" }} />
      <div className="d-flex flex-column align-content-end">
        <div className="d-flex flex-column">
          <h6 className="text-center container" style={{ color: "#eeeeee" }}>
            Created as a Fullstack project at Ironhack's Bootcamp campus São
            Paulo in May/2021.
          </h6>

          <h6 className="text-center" style={{ color: "#eeeeee" }}>
            Using MERN, Bootstrap and other libraries.
          </h6>
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-brand d-flex justify-content-center"
          href="https://www.ironhack.com/br/sao-paulo"
        >
          <img
            src={ironhack}
            width="90"
            height="90"
            className="d-inline-block align-top"
            alt="logo Ironhack"
          />
        </a>
      </div>
    </footer>
  );
}
