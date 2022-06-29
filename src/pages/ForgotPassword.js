import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

function ForgotPassword() {
  const history = useHistory();

  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
  });

  const { email } = newUser;

  const onInputChange = (e) => {
    // console.log("newMentor", newMentor);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // var tmpArr = [];
    // tmpArr.push(newStudent);
    console.log(newUser);

    // const url = "https://urlshortener-clone.herokuapp.com/password-reset/";
    const url = "http://localhost:4000/password-reset/";
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(newUser),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("Success:", data);

        if (data.msgType === "error") {
          setErrorMsg(data.message);
          setMsg("");
        } else if (data.msgType === "success") {
          setErrorMsg("");
          setMsg(data.message);
        }

        // if (data.message === "Invalid URL") {
        //   setErrorMsg(data.message);
        //   setMsg("");
        // } else if (data.message === "Valid URL") {
        //   history.push("/password-reset");
        // }

        // if (data.message === "Account not activated yet") {
        //   setMsg(data.message);
        // } else if (data.message === "Internal Server Error") {
        //   setMsg(data.message);
        // } else {
        //   history.push("/dashboard");
        // }
        // history.push("/students");
      });
  };

  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5 bg-light">
            <h2>Forgot Password</h2>
            <form>
              <div className="form-group mb-3">
                <label>Enter your Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={(e) => onInputChange(e)}
                  value={email}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </form>
            {msg ? <p className="alert alert-success">{msg}</p> : ""}
            {errorMsg ? <p className="alert alert-danger">{errorMsg}</p> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
