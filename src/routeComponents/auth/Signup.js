import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";
import { Multiselect } from "multiselect-react-dropdown";

function Signup(props) {
  let gamesList = [];
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    gamesList: [],
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const games = [
    { Games: "Battle Royale", id: 1 },
    { Games: "FPS", id: 2 },
    { Games: "MMORPG", id: 3 },
    { Games: "MOBA", id: 4 },
    { Games: "RACE", id: 5 },
    { Games: "SOCCER", id: 6 },
    { Games: "OTHER", id: 7 },
  ];

  const [options] = useState(games);

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  function handleCheck(event) {
    gamesList = event.map((x) => x.Games);
    setState({
      ...state,
      gamesList,
    });
    console.log(state);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      props.history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div style={{ backgroundColor: "#303841" }}>
      <div className="container vh-100">
        <h1 style={{ color: "#eeeeee" }}>Signup!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="signupFormName"
              className="form-label"
              style={{ color: "#eeeeee" }}
            >
              Name
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="signupFormName"
              value={state.name}
              error={errors.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="signupFormEmail"
              className="form-label"
              style={{ color: "#eeeeee" }}
            >
              E-mail Address
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="signupFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="signupFormPassword"
              className="form-label"
              style={{ color: "#eeeeee" }}
            >
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="signupFormPassword"
              placeholder="Must have at least 8 characters, uppercase and lowercase letters, numbers and special characters."
              value={state.password}
              error={errors.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="signupFormGames"
              className="form-label"
              style={{ color: "#eeeeee" }}
            >
              Choose your games
            </label>
            <Multiselect
              options={options}
              displayValue="Games"
              onSelect={handleCheck}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{ backgroundColor: "#00adb5", color: "#eeeeee" }}
          >
            Submit
          </button>
          <Link to="/auth/login" style={{ color: "#eeeeee" }}>
            Already have an account? Click here to login.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
