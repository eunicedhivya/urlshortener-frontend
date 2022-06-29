import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import React from "react";

function Signup() {
  const history = useHistory();

  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const { fname, lname, email, password } = newUser;

  function isValidEmail(val) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return false;
    }
    return true;
  }

  const onInputChange = (e) => {
    // console.log("newMentor", newMentor);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // var tmpArr = [];
    // tmpArr.push(newStudent);
    console.log(newUser);

    if (!isValidEmail(newUser.email)) {
      toast.error("Add correct email id");
      return;
    }

    const url = "https://urlshortener-clone.herokuapp.com/users/signup";
    // const url = "http://localhost:4000/users/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(newUser),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log("Success:", data);
        if (data.msgType === "error") {
          toast.error(data.message);
        } else if (data.msgType === "success") {
          toast.success(data.message);
          history.push("/");
        }
      });
  };

  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-2">
            <h2>Signup</h2>
            <form>
              <div className="form-group mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  onChange={(e) => onInputChange(e)}
                  value={fname}
                />
              </div>
              <div className="form-group mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  onChange={(e) => onInputChange(e)}
                  value={lname}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={(e) => onInputChange(e)}
                  value={email}
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={(e) => onInputChange(e)}
                  value={password}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mb-3"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
