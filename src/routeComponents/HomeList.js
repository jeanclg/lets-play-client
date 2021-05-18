import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../apis/api";
import { Multiselect } from "multiselect-react-dropdown";
import { AuthContext } from "../contexts/authContext";

function HomeList() {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  let gamesList = [];

  const games = [
    { Games: "Battle Royale", id: 1 },
    { Games: "FPS", id: 2 },
    { Games: "MMORPG", id: 3 },
    { Games: "MOBA", id: 4 },
  ];

  const [options] = useState(games);

  function handleCheck(event) {
    gamesList = event.map((x) => x.Games);
    console.log(gamesList);
    setList(users.filter((x) => x.gamesList.includes(...gamesList)));
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/users");

        setUsers([...response.data]);
        if (list.length <= 0) {
          setList(users);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, [list]);

  return (
    <div className="container">
      <div className="input-group mb-3 mt-3">
        <Multiselect
          options={options}
          displayValue="Games"
          onSelect={handleCheck}
          onRemove={handleCheck}
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
            {list.map((user) => {
              if (user._id !== loggedUser._id)
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
