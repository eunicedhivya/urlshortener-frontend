import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";
import LogOut from "./LogOut";

function NavBar() {
  const { loggedIn } = useContext(AuthContext);
  // console.log("loggedIn", loggedIn);

  return (
    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      {loggedIn ? (
        <>
          <NavLink to="/dashboard" className="nav-link px-2 link-secondary">
            Dashboard
          </NavLink>
          <NavLink to="/links" className="nav-link px-2 link-dark">
            links
          </NavLink>
          <NavLink to="/create" className="nav-link px-2 link-dark">
            Create
          </NavLink>
          <LogOut />
        </>
      ) : (
        <>
          <NavLink className="btn btn-outline-primary me-2" to="/">
            Login
          </NavLink>
          <NavLink className="btn btn-outline-primary me-2" to="/signup">
            Signup
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
