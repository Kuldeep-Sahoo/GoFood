const express = require("express");
const router = express.Router();
const Order = require("./../models/Orders");

// Admin route to get all orders
router.post("/admin", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({}); // Adjust query if needed

    // Simplify the response structure
    const simplifiedOrders = orders.map((order) => ({
      orderId: order._id, // Include order ID
      email: order.email, // Include user email
      orderData: order.order_data.map((orderItem) => ({
        orderDate: orderItem[0].Order_date, // Extract order date
        items: orderItem.map((item) => ({
          id: item.id, // Item ID
          name: item.name, // Item name
          price: item.price, // Item price
          qty: item.qty, // Item quantity
          size: item.size, // Item size
        })),
      })),
    }));

    // Send the simplified response
    res.status(200).json({ orders: simplifiedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
