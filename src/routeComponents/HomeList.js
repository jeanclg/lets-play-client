import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../apis/api";

function HomeList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await api.get("/users");

        setUsers([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBeers();
  }, []);

  return (
    <div className="container">
      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          name="gamesList"
          placeholder="Search for a game"
        />
      </div>
      <div className="input-group mb-3 mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Games</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>
                    <img src={user.image_url} style={{ height: "40px" }} />
                  </td>
                  <td>
                    <Link to={`/user/${user._id}`}>{user.name}</Link>
                  </td>
                  <td>{`${user.gamesList}`} </td>
                  <td>
                    <button type="button" className="btn btn-success">
                      <Link
                        style={{ color: "inherit" }}
                        to={`/messages/${user._id}`}
                      >
                        Message
                      </Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeList;