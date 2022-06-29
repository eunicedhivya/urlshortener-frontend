// import } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "js-cookie";
import BarChart from "../components/BarChart";

function Profile() {
  const { loggedIn } = useContext(AuthContext);
  console.log("loggedIn", loggedIn);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getMeInfo();
    return () => {};
  }, []);

  async function getMeInfo() {
    // const url = "https://urlshortener-clone.herokuapp.com/users/me";
    const url = "http://localhost:4000/users/me";

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

    // const url2 = "https://urlshortener-clone.herokuapp.com/users/datapoints";
    const url2 = "http://localhost:4000/users/datapoints";
    fetch(url2, {
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
        console.log("data", data);
        setChartData(data);
      });
  }

  const dataLabels = chartData.map(function (itm) {
    return itm._id;
  });
  const dataPoints = chartData.map(function (itm) {
    return itm.count;
  });

  // console.log("dataLabels", dataLabels);
  // console.log("dataPoints", dataPoints);
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
                  <small className="text-muted">First Name</small>
                  <h6 className="my-0">{firstName}</h6>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <small className="text-muted">Last Name</small>
                  <h6 className="my-0">{lastName}</h6>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <small className="text-muted">Email ID</small>
                  <h6 className="my-0">{emailId}</h6>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <div className="row">
              <div className="col">
                {chartData.length === 0 ? (
                  <div>
                    0 shortlinks.
                    <br />
                    <a href="/create">Click here</a> to create a shortlink
                  </div>
                ) : (
                  <BarChart datapoints={dataPoints} datalabel={dataLabels} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
