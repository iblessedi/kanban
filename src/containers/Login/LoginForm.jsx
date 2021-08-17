import React from "react";
import { withRouter } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

function LoginForm() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if (!isAuthenticated) {
    loginWithRedirect();
  }
  return (<></>);
}

export default withRouter(LoginForm);