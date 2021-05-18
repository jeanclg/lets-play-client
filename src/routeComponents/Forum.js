import { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import api from "../apis/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PostList() {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get(`/post`);
        setState([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, [id, message]);

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await api.post(`/user/${loggedUser._id}/post`, {
        text: message,
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(event) {
    try {
      const response = await api.delete(`/post/${event.target.name}`);
      setMessage(response);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ minHeight: "703px" }}>
        <div className="input-group">
          <textarea
            className="input-group mb-2 mt-3"
            aria-label="With textarea"
            placeholder=" Write here"
            name="message"
            onChange={handleChange}
            value={message}
          ></textarea>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary mb-3"
          >
            Send
          </button>
        </div>
        <table className="table table-hover">
          <tbody>
            {state
              .map((x) => {
                if (loggedUser._id === x.userId._id) {
                  return (
                    <tr key={x._id}>
                      <td>
                        <img
                          src={x.userId.image_url}
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
                        <Link
                          style={{ color: "inherit" }}
                          to={`/user/${x.userId._id}npm star`}
                        >
                          <strong>{x.userId.name} diz:</strong>
                        </Link>{" "}
                        {x.text}
                      </td>
                      <td>{`${new Date(x.data).getDate()}/${
                        new Date(x.data).getMonth() + 1
                      }/${new Date(x.data).getFullYear()} ⠀${new Date(
                        x.data
                      ).getHours()}:${new Date(x.data).getMinutes()}`}</td>
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
                        <img
                          src={x.userId.image_url}
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
                        <Link
                          style={{ color: "inherit" }}
                          to={`/user/${x.userId._id}`}
                        >
                          <strong>{x.userId.name} diz:</strong>
                        </Link>{" "}
                        {x.text}
                      </td>
                      <td>{`${new Date(x.data).getDate()}/${
                        new Date(x.data).getMonth() + 1
                      }/${new Date(x.data).getFullYear()} ⠀${new Date(
                        x.data
                      ).getHours()}:${new Date(x.data).getMinutes()}`}</td>
                    </tr>
                  );
                }
              })
              .reverse()}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default PostList;
