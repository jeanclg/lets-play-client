import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Letsplayhome2.png";

function Home() {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{backgroundColor:"#303841"}}>
      <div className=" d-flex flex-column align-items-center">
        <img src={Logo} width="400" height="400" alt="LetsPlay logo" />

        <p className="text-monospace" style={{color:"#eeeeee"}}>Connect with gamers, make friends!</p>
        <div className="d-flex flex-column align-items-center">
          <Link
            className="btn btn-lg btn-primary"
            style={{ backgroundColor: "#00adb5", color:"#eeeeee" }}
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
