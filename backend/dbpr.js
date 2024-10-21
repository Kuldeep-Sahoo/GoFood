// const mongoose = require("mongoose");
// const mongoURI ="mongodb+srv://gofood:Sahoo1234567890@cluster0.8o0ds.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";

// const mongoDB = async () => {
//   await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
//     if (err) {
//       console.log("---", err);
//     } else {
//       console.log("Connected Successfully");
//     }
//   });
// }
// module.exports = mongoDB;

// ===> solution 1
const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://gofood:Sahoo1234567890@cluster0.8o0ds.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";
// const mongoURL = "mongodb://localhost:27017/gofood";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", async () => {
  console.log("Connected to MongoDB server...", mongoURL);
  try {
    const fetched_data = mongoose.connection.db.collection("users");
    const data = await fetched_data.find({}).toArray();
    console.log(data);
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

// ===> solution 2
// const mongoURI =
// "mongodb+srv://gofood:Sahoo1234567890@cluster0.8o0ds.mongodb.net/gofood?retryWrites=true&w=majority";
// // URI--> Uniform Resource Identifier.
// const mongoose = require("mongoose");

// mongoose
//   .connect(mongoURI)
//   .then(async () => {
//     console.log("MongoDB connected");

//     try {
//       const fetched_data = mongoose.connection.db.collection("food-items");
//       const data = await fetched_data.find({}).toArray();
//       console.log(data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));
