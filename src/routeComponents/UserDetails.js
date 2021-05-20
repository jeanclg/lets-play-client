import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useParams, Link, useHistory } from "react-router-dom";
import api from "../apis/api";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";

function UserDetails() {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [state, setState] = useState({
    name: "",
    email: "",
    image_url: "",
    gamesList: [],
    recieveMessages: [],
    uploadedPosts: [],
    role: "",
  });

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/${id}`);
        console.log(response);
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [id]);

  if (loggedUser._id === id) {
    console.log(state);
    return (
      <div style={{ backgroundColor: "#303841", color: "#eeeeee" }}>
        <NavbarComponent />
        <div
          className="container justify-content-center d-flex align-items-center"
          style={{ minHeight: "700px" }}
        >
          <div
            className="card align-items-center mt-4 mb-4"
            style={{
              minWidth: "34rem",
              maxWidth: "34rem",
              backgroundColor: "#00adb5",
            }}
          >
            <img
              src={state.image_url}
              className="card-img-top"
              alt="User Profile"
            />
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title" style={{ color: "#eeeeee" }}>
                {state.name}
              </h5>
              <div className="d-flex align-self-center">
                {state.gamesList.map((x) => (
                  <p className="card-text btn">
                    <strong>{x}</strong>
                  </p>
                ))}
              </div>
              <Link style={{ color: "inherit" }} to={`/edit`}>
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "#303841", color: "#eeeeee" }}>
        <NavbarComponent />
        <div
          className="container justify-content-center d-flex align-items-center"
          style={{ minHeight: "700px" }}
        >
          <div
            className="card align-items-center mt-4 mb-4"
            style={{
              minWidth: "34rem",
              maxWidth: "34rem",
              backgroundColor: "#00adb5",
            }}
          >
            <img
              src={state.image_url}
              className="card-img-top"
              alt="User Profile"
            />
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">{state.name}</h5>
              <div className="d-flex align-self-center">
                {state.gamesList.map((x) => (
                  <p className="card-text btn">
                    <strong>{x}</strong>
                  </p>
                ))}
              </div>
              <Link style={{ color: "inherit" }} to={`/messages/${state._id}`}>
                <button type="button" className="btn btn-success">
                  Message
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserDetails;
