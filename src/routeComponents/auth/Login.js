import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

function Login(props) {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  console.log(authContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      props.history.push("/home");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div style={{ backgroundColor: "#303841" }}>
      <div className="container vh-100" style={{color: "#eeeeee" }}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="signupFormEmail" className="form-label">
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
            <label htmlFor="signupFormPassword" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="signupFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="btn btn-primary" style={{ backgroundColor: "#00adb5", color: "#eeeeee" }} type="submit">
              Login!
            </button>

            <Link to="/auth/signup" style={{ color: "#eeeeee" }}>
              Don't have an account? Click here to signup!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
