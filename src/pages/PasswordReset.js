import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function ForgotPassword() {
  const history = useHistory();
  const param = window.location.href.split("/");
  const userId = param[param.length - 2];
  const token = param[param.length - 1];

  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [newPassword, setNewPassword] = useState({
    password: "",
  });

  const { password } = newPassword;

  const onInputChange = (e) => {
    // console.log("newMentor", newMentor);
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // var tmpArr = [];
    // tmpArr.push(newStudent);
    console.log(newPassword);

    // const url = "https://urlshortener-clone.herokuapp.com/users/login";
    const url = `http://localhost:4000/password-reset/${userId}/${token}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(newPassword),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("Success:", data);
      });
  };

  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5 bg-light">
            <h2>Password Reset</h2>
            <form>
              <div className="form-group mb-3">
                <label>Email</label>
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
            </form>
            {msg ? <p>{msg}</p> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
