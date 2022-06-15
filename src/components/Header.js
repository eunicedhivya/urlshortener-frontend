import React from "react";
import NavBar from "./NavBar";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <h1>URL Shortener</h1>
            {/* <span className="fs-4">Pricing example</span> */}
          </a>
          <NavBar />
        </div>
      </div>

      <div className="container">
        <p className="fs-5 text-muted">
          Login to the application to create shorturls, to see the list of
          existing shortcodes if you have an account. If not please signup and
          then activate your account to be able to do so etc.,
        </p>
      </div>
    </header>
  );
}

export default Header;
