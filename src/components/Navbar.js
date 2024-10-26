// rfc-->Creates a React Functional Component with ES7 module system (ES7+ React/Redux/React-Native snippets)

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "../screens/ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);

  var data = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const adminRoute = process.env.REACT_APP_ADMIN_ROUTE;
  const handleAdminLogin = () => {
    const password = prompt("if you are admin then enter your password");
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      navigate(adminRoute);
    } else alert("Wrong password!");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-success fixed-top"
        style={{ zIndex: "100" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1">
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>{" "}
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrders"
                  >
                    My Orders
                  </Link>{" "}
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="bg-white text-success btn mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="bg-white text-success btn mx-2"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}
                <div
                  className="btn bg-danger text-white mx-1"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
                {localStorage.getItem("userEmail") == "sahoo192@gmail.com" ? (
                  <div
                    className="bg-danger text-white btn mx-2 justify-content-center"
                    onClick={handleAdminLogin}
                    style={{ borderRadius: "50%" }}
                  >
                    A
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
