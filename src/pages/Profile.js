// import } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "js-cookie";

function Profile() {
  const { loggedIn } = useContext(AuthContext);
  console.log("loggedIn", loggedIn);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  async function getMeInfo() {
    console.log("token", Cookies.get("token"));
    // const url = "https://urlshortener-clone.herokuapp.com/users/me";
    const url = "http://localhost:4000/users/me";
    // const loggedInRes = await fetch(url, { method: "GET" });
    // console.log(loggedInRes.body);
    // setLoggedIn(loggedInRes.data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ token: Cookies.get("token") }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("Success:", data);
        setFirstName(data.fname);
        setLastName(data.lname);
        setEmailId(data.email);
        // history.push("/");
      });

    // fetch(url, { method: "GET", credentials: "include" })
    //   .then((data) => data.json())
    //   .then((data) => {
    //     console.log("data", data);
    //     setFirstName(data.fname);
    //     setLastName(data.lname);
    //     setEmailId(data.email);

    //     // setLoggedIn(data);
    //   });
    // .then(() => history.push("/mentors"));
  }

  useEffect(() => {
    getMeInfo();
    return () => {};
  }, []);

  return (
    // <div>
    //   <h2>Profile Page</h2>
    //   <p>{firstName}</p>
    //   <p>{lastName}</p>
    //   <p>{emailId}</p>
    // </div>
    <div className="container">
      <main>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Account Details</span>
            </h4>
            <ul className="list-group mb-3 text-left">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{firstName}</h6>
                  <small className="text-muted">First Name</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{lastName}</h6>
                  <small className="text-muted">Last Name</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{emailId}</h6>
                  <small className="text-muted">Email ID</small>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <div className="row">
              <div className="col-md-4">Test</div>
              <div className="col-md-4">Test</div>
              <div className="col-md-4">Test</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
