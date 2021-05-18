import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_lets_play-removebg-preview.png";

function Home() {
  return (
    <div className="h-100  align-items-center">
      <div className="d-flex flex-column align-items-center">
        <img src={Logo} width="400" height="400" alt="LetsPlay logo" />

        <p className="text-monospace">Connect with gamers, make friends!</p>
        <div className="d-flex flex-column align-items-center">
          <Link
            className="btn btn-lg btn-primary"
            style={{ backgroundColor: "#3dadff" }}
            to="/auth/signup"
          >
            Signup here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
