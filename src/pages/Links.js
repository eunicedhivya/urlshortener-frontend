// import } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";

function Links() {
  const { loggedIn } = useContext(AuthContext);
  console.log("loggedIn", loggedIn);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [emailId, setEmailId] = useState("");
  const [linklist, setlinklist] = useState([]);

  async function getMeLinks() {
    const url = "http://localhost:4000/users/links";
    // const loggedInRes = await fetch(url, { method: "GET" });
    // console.log(loggedInRes.body);
    // setLoggedIn(loggedInRes.data);
    fetch(url, { method: "GET", credentials: "include" })
      .then((data) => data.json())
      .then((data) => {
        // console.log("data", data);
        // setFirstName(data.fname);
        // setLastName(data.lname);
        // setEmailId(data.email);

        setlinklist(data);
      });
    // .then(() => history.push("/mentors"));
  }

  useEffect(() => {
    getMeLinks();
    return () => {};
  }, []);

  console.log("linklist", linklist);

  return (
    <div className="container">
      <h2>Links Page</h2>
      <div className="table-responsive">
        <table className="table text-center">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Long URL</th>
              <th style={{ width: "35%" }}>SHort URL</th>
              <th style={{ width: "25%" }}>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {linklist.map(function (item) {
              // console.log();
              return (
                <tr>
                  <td>{item.longUrl}</td>
                  <td>{item.shortUrl}</td>
                  <td>{item.userid}</td>
                </tr>
              ); // return <p>item</p>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Links;
