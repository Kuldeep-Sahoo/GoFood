import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Admin.css"; // Import custom CSS file

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setOrders(json.orders); // Assuming your response structure has an 'orders' key
        setLogs(json.logs);
        setUsers(json.users);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div>
      <Navbar />
        <h1 className="container">Order List</h1>
      <div className="container d-flex" style={{height:"1000px", overflow:"auto"}}>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Email</th>
                <th>Order Date</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].reverse().map((order) => (
                <React.Fragment key={order.orderId}>
                  {order.orderData.map((orderData, index) => (
                    <tr key={index}>
                      {index === 0 ? (
                        <>
                          <td rowSpan={order.orderData.length}style={{maxWidth:"100px",overflow:"hidden"}}>
                            {order.orderId}
                          </td>
                          <td rowSpan={order.orderData.length}>
                            {order.email}
                          </td>
                          <td>
                            {new Date(orderData.orderDate).toLocaleString()}
                          </td>
                          <td>
                            {orderData.items.length > 0 ? (
                              <ul>
                                {orderData.items.map((item) => (
                                  <li key={item.id}>
                                    {item.name} - Price: ₹{item.price}, Qty:{" "}
                                    {item.qty}, Size: {item.size}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span>No items found</span> // Handle case with no items
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            {new Date(orderData.orderDate).toLocaleString()}
                          </td>
                          <td>
                            {orderData.items.length > 0 ? (
                              <ul>
                                {orderData.items.map((item) => (
                                  <li key={item.id}>
                                    {item.name} - Price: ₹{item.price}, Qty:{" "}
                                    {item.qty}, Size: {item.size}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span>No items found</span> // Handle case with no items
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="d-flex  justify-content-center" style={{height:"500px", fontSize:"10px"}}>
        <div
          className="container"
          style={{
            width: "50%",
            overflow: "auto",
            border: "2px solid red",
            margin: "2px",
          }}
        >
          <h1>Logs</h1>
          {logs.length === 0 ? (
            <p>No log found.</p>
          ) : (
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>location</th>
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{log.log}</td>
                    <td>{log.email}</td>
                    <td>{log.password}</td>
                    <td>{log.name}</td>
                    <td>{log.date}</td>
                    <td>{log.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div
          className="container"
          style={{
            width: "50%",
            overflow: "auto",
            border: "2px solid red",
            margin: "2px",
          }}
        >
          <h1>Users</h1>
          {users.length === 0 ? (
            <p>No user found.</p>
          ) : (
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Name</th>
                  <th>location</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[...users].reverse().map((user, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.realPassword}</td>
                    <td>{user.name}</td>
                    <td>{user.location}</td>
                    <td>{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
