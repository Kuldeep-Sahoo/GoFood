import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function Signup() {
  
  // useStateSnippet
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const [address, setAddress] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // synthetic event
    // console.log("Inputted Data:", credentials);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      }
    );
    const json = await response.json();
    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      navigate("/login");
      console.log("User registered successfully.....");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });
    let [lat, long] = latlong;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/getlocation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latlong: { lat, long } }),
      }
    );
    const {location}=await response.json()
    setAddress(location)
    setcredentials({...credentials,[e.target.name]:address})
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              onClick={handleClick}
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              />
          </div>
          <div className="m-3">
            <button
              type="button"
              name="geolocation"
              className=" btn btn-success"
              onClick={handleClick}
            >
              Click for current Location{" "}
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
