import React from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import "./Cart.css"; // or the path to your CSS file
import { Link } from "react-router-dom";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <>
        <div>
          <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>{" "}
        </div>
        <Link
          className="fs-15 btn nav-link active bg-success text-white "
          style={{ width: "auto", display: "flex", justifyContent: "center" }}
          aria-current="page"
          to="/myOrders"
        >
          My Orders
        </Link>{" "}
      </>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${process.env.REACT_APP_API_URL}/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      }),
    });
    console.log("Order Response: ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md scrollable-cart">
        <table className="table table-hover">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-1 bg-danger text-white"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    {" "}
                    Remove
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {" "}
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>{" "}
        </div>
        <div>
          <p style={{ color: "red" }}>
            * If the order delivered click the Check Out button
          </p>
          <button className="btn bg-success " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
