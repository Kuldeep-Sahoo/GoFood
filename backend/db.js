require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL =process.env.MONGO_URL_ONLINE;
// const mongoURL = process.env.MONGO_URL_LOCAL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", async () => {
  console.log("Connected to MongoDB server...", mongoURL);
  try {
    const foodItems = await db.collection("food-items").find({}).toArray();
    const foodCategory = await db
      .collection("food-category")
      .find({})
      .toArray();
    global.food_items = foodItems;
    global.food_category = foodCategory;
    console.log("Data fetched successfully.....");
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});
db.on("error", (err) => {
  console.log("MongoDb connection error:", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected...");
});
module.exports = db;
