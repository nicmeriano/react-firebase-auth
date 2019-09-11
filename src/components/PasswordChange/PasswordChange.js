import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

export default function PasswordChangePage() {
  return (
    <div>
      <h1>Password Change</h1>
      <PasswordChangeForm />
    </div>
  );
}

function PasswordChangeFormBase({ firebase, history }) {
  const INITIAL_STATE = {
    passwordOne: "",
    passwordTwo: "",
    error: null
  };

  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    event.preventDefault();
    const { passwordOne } = state;
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState({ ...INITIAL_STATE, error });
      });
  };

  const onChange = event => {
    const field = event.target.name;
    setState({ ...state, [field]: event.target.value });
  };
  const { passwordOne, passwordTwo, error } = state;
  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === "" || passwordTwo === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        type="password"
        name="passwordOne"
        value={passwordOne}
        placeholder="Password"
        onChange={onChange}
      />
      <input
        type="password"
        name="passwordTwo"
        value={passwordTwo}
        placeholder="Confirm Password"
        onChange={onChange}
      />
      <button type="submit" disabled={isInvalid}>
        Change Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const PasswordChangeForm = compose(
  withRouter,
  withFirebase
)(PasswordChangeFormBase);

export { PasswordChangeForm };
