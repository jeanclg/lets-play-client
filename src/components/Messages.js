import { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import api from "../apis/api";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";

function MessageList() {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await api.get(`/${id}/messages`);
        setState([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, [id, message]);

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await api.post(`/user/${id}/message`, {
        message: message,
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(event) {
    try {
      const response = await api.delete(`/message/${event.target.name}`);
      setMessage(response);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ backgroundColor: "#303841", color: "#eeeeee" }}>
      <NavbarComponent />
      <div className="container" style={{ minHeight: "700px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control mb-2 mt-3"
              placeholder=" Write here"
              name="message"
              onChange={handleChange}
              value={message}
              style={{ height: "100px" }}
            />
            <button
              type="button"
              type="submit"
              className="btn btn-primary mb-3"
              style={{ backgroundColor: "#00adb5", color: "#eeeeee" }}
            >
              Send
            </button>
          </div>
        </form>
        <table className="table table-hover">
          <tbody>
            {state.map((x) => {
              if (loggedUser._id === x.userSenderId._id) {
                return (
                  <tr key={x._id}>
                    <td>
                      <img
                        src={x.userSenderId.image_url}
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
                    <td style={{ maxWidth: "181.4px", color: "#eeeeee" }}>
                      <strong>{x.userSenderId.name} diz:</strong> {x.message}
                    </td>
                    <td style={{ color: "#eeeeee" }}>{`${new Date(
                      x.data
                    ).getDate()}/${new Date(x.data).getMonth() + 1}/${new Date(
                      x.data
                    ).getFullYear()} ⠀${new Date(x.data).getHours()}:${new Date(
                      x.data
                    ).getMinutes()}`}</td>
                    <td>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger"
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
                        src={x.userSenderId.image_url}
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
                    <td style={{ maxWidth: "181.4px", color: "#eeeeee" }}>
                      <strong>{x.userSenderId.name} diz:</strong> {x.message}
                    </td>
                    <td style={{ color: "#eeeeee" }}>{`${new Date(
                      x.data
                    ).getDate()}/${new Date(x.data).getMonth() + 1}/${new Date(
                      x.data
                    ).getFullYear()} ⠀${new Date(x.data).getHours()}:${new Date(
                      x.data
                    ).getMinutes()}`}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <ul className="list-group"></ul>
      </div>
      <Footer />
    </div>
  );
}

export default MessageList;
