import React from "react";

import { withAuthorization } from "../Session";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This page is only accessible to signed in users.</p>
    </div>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
