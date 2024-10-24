// require("dotenv").config();
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;
// const mongoDB = require("./db");

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "http://localhost:3000"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// // mongoDB();
// app.get("/", (req, res) => {
//   res.send("Kuldeep");
// });
// app.use(express.json());
// app.use("/api", require("./Routes/CreateUser"));
// app.use("/api", require("./Routes/DisplayData"));
// app.use("/api", require("./Routes/OrderData"));
// app.use("/api", require("./Routes/Admin"));
// app.listen(port, (req, res) => {
//   console.log(`Example app listenning on port ${port}`);
// });

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");

// Allow requests from both localhost (for local testing) and the deployed frontend URL
app.use((req, res, next) => {
  const allowedOrigin =
    req.headers.origin === "https://gofood-kuldeep.onrender.com"
      ? "https://gofood-kuldeep.onrender.com"
      : "http://localhost:3000";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Test route to ensure backend is up
app.get("/", (req, res) => {
  res.send("This is the api for gofood-kuldeep");
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/Admin"));
app.use("/api", require("./Routes/Location"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
