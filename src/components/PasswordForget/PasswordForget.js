import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

export default function PasswordForgetPage() {
  return (
    <div>
      <h1>Password Forget</h1>
      <PasswordForgetForm />
    </div>
  );
}

function PasswordForgetFormBase({ firebase, history }) {
  const INITIAL_STATE = {
    email: "",
    error: null
  };

  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    event.preventDefault();
    const { email } = state;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        setState({ ...INITIAL_STATE, error });
      });
  };

  const onChange = event => {
    const field = event.target.name;
    setState({ ...state, [field]: event.target.value });
  };
  const { email, error } = state;
  const isInvalid = email === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email Address"
        onChange={onChange}
      />
      <button type="submit" disabled={isInvalid}>
        Reset Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

function PasswordForgetLink() {
  return (
    <p>
      Forgot your password? Reset it{" "}
      <Link to={ROUTES.PASSWORD_FORGET}>here</Link>
    </p>
  );
}

const PasswordForgetForm = compose(
  withRouter,
  withFirebase
)(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
