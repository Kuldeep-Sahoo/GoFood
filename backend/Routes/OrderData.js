const express = require("express");
const router = express.Router();
const Order = require("./../models/Orders")


router.post("/orderData", async (req, res) => {
    let data = req.body.order_data;

    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await Order.findOne({ "email": req.body.email })
    console.log(eId);

    // email is not present in Orders database means its the first order of that email
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message);
            res.send("Server Error", error.message)

        }
    }
    // email exists in the Orders database
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{res.json({success:true})})
        } catch (error) {
            res.send("Server Error",error.message)
        }
    }
});

// router.post("/myOrderData",async (req,res)=>{
//     try {
//         let myData=await Order.findOne({"email":req.body.email})
//         console.log("from backend: ",myData);
//         res.json({order_data:myData})
//     } catch (error) {
//         res.send("Server Error",error.message)
//     }
// })



router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;

    // Fetch orders by email from MongoDB
    const order = await Order.findOne({ email });

    if (!order) {
      return res.status(404).json({ message: "No orders found." });
    }

    // Restructure order data into a flat array
    const formattedOrderData = order.order_data.map((orderArray) => ({
      orderDate: orderArray[0].Order_date,
      items: orderArray.slice(1), // Extract the product items
    }));

    res.status(200).json({ order_data: formattedOrderData });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
