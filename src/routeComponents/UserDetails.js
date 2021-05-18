import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useParams, Link, useHistory } from "react-router-dom";
import api from "../apis/api";

function UserDetails() {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [state, setState] = useState([]);

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/${id}`);
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [id]);

  if (loggedUser._id === id) {
    return (
      <div className="container justify-content-center d-flex align-items-center">
        <div
          className="card align-items-center mt-5"
          style={{ width: "34rem", backgroundColor: "#3dadff" }}
        >
          <img
            src={state.image_url}
            className="card-img-top"
            alt="User Profile"
          />
          <div className="card-body text-center">
            <h5 className="card-title">{state.name}</h5>
            <p className="card-text btn btn-outline-dark">{state.gamesList}</p>
            {/* {state.gamesList.map((x)=> <p className="card-text btn btn-outline-dark">{x}</p>) }  */}
            <Link style={{ color: "inherit" }} to={`/edit`}>
              <button type="button" className="btn btn-warning">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div
          className="card"
          style={{ width: "34rem", backgroundColor: "#3dadff" }}
        >
          <img
            src={state.image_url}
            className="card-img-top"
            alt="User Profile"
          />
          <div className="card-body">
            <h5 className="card-title">{state.name}</h5>
            <p className="card-text">{state.gamesList}</p>
            <button type="button" className="btn btn-success">
              <Link style={{ color: "inherit" }} to={`/messages/${state._id}`}>
                Message
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
