import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
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
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      props.history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div className="container">
      <h1>Signup!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="signupFormName" className="form-label">
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
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
        <Link to="/auth/login">
          Already have an account? Click here to login.
        </Link>
      </form>
    </div>
  );
}

export default Signup;
