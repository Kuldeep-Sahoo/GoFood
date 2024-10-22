import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './Admin.css'; // Import custom CSS file

export default function Admin() {
  const [orders, setOrders] = useState([]);
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
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Order List</h1>
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
              {orders.map((order) => (
                <React.Fragment key={order.orderId}>
                  {order.orderData.map((orderData, index) => (
                    <tr key={index}>
                      {index === 0 ? (
                        <>
                          <td rowSpan={order.orderData.length}>
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
                                    {item.name} - Price: ₹{item.price}, Qty: {item.qty}, Size: {item.size}
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
                                    {item.name} - Price: ₹{item.price}, Qty: {item.qty}, Size: {item.size}
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
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
