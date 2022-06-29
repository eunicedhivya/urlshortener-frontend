import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();
function AuthContextProvider(props) {
  // set default to undefined
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const url = "https://urlshortener-clone.herokuapp.com/users/loggedIn";
    // const url = "http://localhost:4000/users/loggedIn";

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
        // console.log("LoggedIn:", data);
        setLoggedIn(data);
      });

    console.log("isLoggedIn", loggedIn);

    // fetch(url, { method: "GET", credentials: "include" })
    //   .then((data) => data.json())
    //   .then((data) => {
    //     console.log("data", data);
    //     setLoggedIn(data);
    //   });
    // .then(() => history.push("/mentors"));
  }

  useEffect(() => {
    getLoggedIn();
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
