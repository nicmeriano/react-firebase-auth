import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp/SignUp";
import { PasswordForgetLink } from "../PasswordForget/PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

export default function SignInPage() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <SignUpLink />
      <PasswordForgetLink />
    </div>
  );
}

function SignInFormBase({ firebase, history }) {
  const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
  };

  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    event.preventDefault();
    const { email, password } = state;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState({ ...state, error });
      });
  };
  const onChange = event => {
    const field = event.target.name;

    setState({ ...state, [field]: event.target.value });
  };

  const { email, password, error } = state;

  const isInvalid = password === "" || email === "";

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export { SignInForm };
