import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import api from "../apis/api";

function UserDetails() {
  const [state, setState] = useState([]);

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await api.get(`/user/${id}`);
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBeers();
  }, [id]);

  return (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={state.image_url}
          className="card-img-top"
          alt="User Profile"
        />
        <div className="card-body">
          <h5 className="card-title">{state.name}</h5>
          <p className="card-text">{state.gamesList}</p>
          <button type="button" class="btn btn-success">
            <Link style={{ color: "inherit" }} to={`/messages/${state._id}`}>
              Message
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
