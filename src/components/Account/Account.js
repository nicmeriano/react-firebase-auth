import React from "react";

import { PasswordChangeForm } from "../PasswordChange/PasswordChange";
import { PasswordForgetForm } from "../PasswordForget/PasswordForget";
import { AuthUserContext, withAuthorization } from "../Session";

function AccountPage() {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account Page: {authUser.email}</h1>
          <h3>Change Password</h3>
          <PasswordChangeForm />
          <h3>Reset Password</h3>
          <PasswordForgetForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
