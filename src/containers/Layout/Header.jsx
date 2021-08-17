import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { isAuthenticated, logout, user } = useAuth0();
  return (
    <div className="bg-gray-200 p-6">
      <div>
        <div className="float-left">
          <Link to="/">
            Kanban App
          </Link>
        </div>
        {isAuthenticated && (
          <div className="w-1/2 float-right text-right">
            <span>
              Hello, {user.nickname}
            </span>
            <span> &nbsp;|&nbsp; </span>
            <button onClick={() => { logout(); localStorage.clear(); }}>
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="clear-both" />
    </div>
  );
}

export default withRouter(Header);