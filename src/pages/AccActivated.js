import React from "react";

function AccActivated() {
  return (
    <div className="mt-5">
      <h1 className="text-primary">Account has been activated.</h1>
      <p>
        Please{" "}
        <a className="text-primary" href="/">
          click here
        </a>{" "}
        to login
      </p>
    </div>
  );
}

export default AccActivated;
