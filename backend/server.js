require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000" || process.env.ALLOWED_ORIGIN
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  next();
});
// mongoDB();
app.get("/", (req, res) => {
  res.send("Kuldeep");
});
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/Admin"));
app.listen(port, (req, res) => {
  console.log(`Example app listenning on port ${port}`);
});
