import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;

// Q: How can I convert this class HOC to a functional one? If I implement it like so I'm unable to 'pass' the firebase object

// import React, { useState, useEffect } from "react";

// import AuthUserContext from "./context";
// import { withFirebase } from "../Firebase";

// const withAuthenticationBase = Component => props => {
//   const [authUser, setAuthUser] = useState(null);

//   useEffect(() => {
//     props.firebase.auth.onAuthStateChanged(authUser => {
//       authUser ? setAuthUser(authUser) : setAuthUser(null);
//     });
//   }, []);

//   return (
//     <AuthUserContext.Provider value={authUser}>
//       <Component {...props} />
//     </AuthUserContext.Provider>
//   );
// };

// const withAuthentication = withFirebase(withAuthentication);

// export default withAuthentication;
