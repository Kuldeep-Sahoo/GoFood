import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const response = await res.json();
      console.log("Fetched Order Data:", response);
      setOrderData(response.order_data || []); // Set the data properly
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center">My Orders</h2>
        <div className="row">
          {orderData.length > 0 ? (
            [...orderData].reverse().map((order, index) => (
              <div key={index} className="m-auto mt-4">
                <h5>Order Date: {order.orderDate}</h5>
                <hr />
                <div className="row">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="col-12 col-md-6 col-lg-3 mb-4"
                    >
                      <div className="card" style={{ width: "16rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">
                            Qty: {item.qty} | Size: {item.size}
                          </p>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
