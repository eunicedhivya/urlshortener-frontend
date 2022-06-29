// import } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Create() {
  const { loggedIn } = useContext(AuthContext);
  console.log("loggedIn", loggedIn);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [msgType, setMsgType] = useState("");
  const [respMsg, setRespMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedTxt, setCopiedTxt] = useState("");
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
      toast.error("Pls enter a valid URL");
      return;
    }

    tmpArr["longUrl"] = longUrl;
    tmpArr["token"] = Cookies.get("token");
    console.log(tmpArr);

    const url = "https://urlshortener-clone.herokuapp.com/users/create";
    // const url = "http://localhost:4000/users/create";
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
        console.log("Success:", data);
        toast.success(data.message);
        setShortUrl(data.shortUrl);
        setMsgType(data.msgType);
        setRespMsg(data.message);
        // history.push("/");
      });
  };
  return (
    <div className="container text-center">
      <div className="col-md-6 offset-md-3">
        <div className="row justify-content-center">
          <div className="card p-4 mt-5">
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
                className="btn btn-primary mb-4"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </form>
            {shortUrl ? (
              <button
                className="alert alert-success"
                id="copyShortLink"
                onClick={(e) => {
                  // alert(e.targ et.value);
                  navigator.clipboard.writeText(
                    document.getElementById("copyShortLink").innerText
                  );
                  setCopiedTxt(
                    document.getElementById("copyShortLink").innerText
                  );
                  toast.success("Copied");
                  console.log(
                    document.getElementById("copyShortLink").innerText
                  );
                }}
              >
                {" "}
                {shortUrl}
                <span className="copyIcon">
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </button>
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
