import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContextProvider";
import { toast } from "react-toastify";

function LogOut() {
  const { setLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    // await axios.get("http://localhost:5000/auth/logout");
    // await axios.get(
    //   "https://mern-auth-template-tutorial.herokuapp.com/auth/logout"
    // );
    // await getLoggedIn();
    // history.push("/");.
    //
    // console.log(document.cookies);
    // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    console.log("test");
    const url = "http://localhost:4000/users/logout";
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("Success:", data);
        setLoggedIn(false);
        toast.success(data.message);
        history.push("/");
      });
  }

  return (
    <button className="btn btn-outline-primary" onClick={logOut}>
      Log out
    </button>
  );
}

export default LogOut;
