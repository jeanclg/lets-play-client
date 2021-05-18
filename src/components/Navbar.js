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
<nav className="navbar navbar-expand-lg navbar-light" style={{
        backgroundColor: "#3dadff",
      }}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={`/messages/${loggedUser._id}`}>Messages</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/forum">Forum</Link>
        </li>
      </ul>
    </div>
    <div>
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
    </div>

  </div>
</nav>






    // {/* <nav
    //   className="navbar navbar-dark d-flex flex-nowrap"
    //   style={{
    //     backgroundColor: "#3dadff",
    //   }}
    // >
    //   <div className="container d-flex justify-content-start align-content-center ">
    //     <Link className="navbar-brand" to="/home">
    //       <p>Home</p>
    //     </Link>
    //     <Link className="navbar-brand" to="/forum">
    //       <p>Forum</p>
    //     </Link>
    //     <Link className="navbar-brand" to={`/messages/${loggedUser._id}`}>
    //       <p>Messages</p>
    //     </Link>
    //   </div>

    //   <div>
    //     <Dropdown>
    //       <Dropdown.Toggle variant="second" id="dropdown-basic">
    //         <img
    //           src={`https://ui-avatars.com/api/?name=${loggedInUser.user.name}&size=32&background=random`}
    //           className="rounded-circle"
    //           alt="Profile"
    //         />
    //       </Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <Dropdown.Item to={`/user/${loggedUser._id}`} as={NavLink}>
    //           Profile
    //         </Dropdown.Item>
    //         <Dropdown.Item
    //           onClick={(event) => {
    //             event.preventDefault();
    //             // Fazendo processo de Logout
    //             setLoggedInUser({ user: {}, token: "" });
    //             localStorage.removeItem("loggedInUser");
    //           }}
    //         >
    //           Logout
    //         </Dropdown.Item>
    //       </Dropdown.Menu>
    //     </Dropdown>
    //   </div>
    // </nav> */}
  );
}
