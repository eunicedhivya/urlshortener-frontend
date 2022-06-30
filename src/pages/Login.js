import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Login() {
  const history = useHistory();

  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  // const [msg, setMsg] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = newUser;

  const onInputChange = (e) => {
    // console.log("newMentor", newMentor);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // var tmpArr = [];
    // tmpArr.push(newStudent);
    console.log(newUser);

    const url = "https://urlshortener-clone.herokuapp.com/users/login";
    // const url = "http://localhost:4000/users/login";
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
        console.log("Success:", data.headers);
        if (data.msgType === "error") {
          // setErrorMsg(data.message);
          toast.error(data.message);
          // setMsg("");
        } else if (data.msgType === "success") {
          console.log(data);
          if (data.message === "Login Successful") {
            // setErrorMsg("");
            // setMsg(data.message);
            toast.success(data.message);
            setLoggedIn(true);
            Cookies.set("token", data.token);
            history.push("/dashboard");
          }
          // setErrorMsg("");
          // setMsg(data.message);
          // // console.log(request.headers);
          // setLoggedIn(true);
          // Cookies.set("token", data.token);
          // history.push("/dashboard");
        }
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

  // console.log("test", msg);
  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5 bg-light">
            <h2>Login</h2>
            <form>
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
                className="btn btn-primary"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
              <br />
              <Link to="/forgot-password">forgot password</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
