import { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import api from "../apis/api";

function PostList() {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [state, setState] = useState([]);
  let msg = "";

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await api.get(`/post`);
        setState([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBeers();
  }, [id]);

  function handleChange(event) {
    msg = event.target.value;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await api.post(`/user/${loggedUser._id}/post`, {
        text: msg,
      });

      // Redireciona programaticamente para a URL '/'
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(event) {
    try {
      const response = await api.delete(`/post/${event.target.name}`);
      // Redireciona programaticamente para a URL '/'
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="input-group">
        <textarea
          className="input-group mb-3 mt-3"
          aria-label="With textarea"
          name="message"
          onChange={handleChange}
        ></textarea>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Send
        </button>
      </div>
      <table className="table table-hover">
        <tbody>
          {state.map((x) => {
            if (loggedUser._id === x.userId._id) {
              return (
                <tr key={x._id}>
                  <td>
                    {x.userId.name} diz: {x.text}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="btn btn-outline-danger"
                      name={x._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={x._id}>
                  <td>
                    {x.userId.name} diz: {x.text}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <ul className="list-group"></ul>
    </div>
  );
}

export default PostList;
