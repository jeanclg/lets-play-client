import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../apis/api";

function HomeList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/users");

        setUsers([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.image_url}
                      style={{
                        height: "50px",
                        display: "flex",
                        width: "50px",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>
                    <Link to={`/user/${user._id}`}>{user.name}</Link>
                  </td>
                  <td>{`${user.gamesList}`} </td>
                  <td>
                    <Link
                      style={{ color: "inherit" }}
                      to={`/messages/${user._id}`}
                    >
                      <button type="button" className="btn btn-success">
                        Message
                      </button>
                    </Link>
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
