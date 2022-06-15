// import } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";

function Create() {
  const { loggedIn } = useContext(AuthContext);
  console.log("loggedIn", loggedIn);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [msgType, setMsgType] = useState("");
  const [respMsg, setRespMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [emailId, setEmailId] = useState("");

  function isURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return pattern.test(str);
  }

  const onInputChange = (e) => {
    setLongUrl(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var tmpArr = {};

    if (!isURL(longUrl)) {
      setErrorMsg("Pls enter a valid URL");
      return;
    } else {
      setErrorMsg("");
    }

    tmpArr["longUrl"] = longUrl;
    console.log(tmpArr);

    // const url = "https://urlshortener-clone.herokuapp.com/users/signup";
    const url = "http://localhost:4000/users/create";
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(tmpArr),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log("Success:", data);
        setShortUrl(data.shortUrl);
        setMsgType(data.msgType);
        setRespMsg(data.message);
        // history.push("/");
      });
  };

  //   async function getMeInfo() {
  //     const url = "http://localhost:4000/users/me";
  //     // const loggedInRes = await fetch(url, { method: "GET" });
  //     // console.log(loggedInRes.body);
  //     // setLoggedIn(loggedInRes.data);
  //     fetch(url, { method: "GET", credentials: "include" })
  //       .then((data) => data.json())
  //       .then((data) => {
  //         console.log("data", data);
  //         setFirstName(data.fname);
  //         setLastName(data.lname);
  //         setEmailId(data.email);

  //         // setLoggedIn(data);
  //       });
  //     // .then(() => history.push("/mentors"));
  //   }

  //   useEffect(() => {
  //     getMeInfo();
  //     return () => {};
  //   }, []);
  return (
    <div className="container ">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5 bg-light">
            <h2>Create Short URL</h2>
            <form>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="longUrl"
                  name="longUrl"
                  onChange={(e) => onInputChange(e)}
                  value={longUrl}
                />
              </div>
              {errorMsg ? <div style={{ color: "red" }}>{errorMsg}</div> : ""}

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </form>
            {shortUrl ? (
              <div
                className="alert alert-success"
                onClick={(e) => {
                  // navigator.clipboard.writeText(e.target.value);
                  // console.log(e.target.innertext);
                }}
              >
                {" "}
                {shortUrl}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
