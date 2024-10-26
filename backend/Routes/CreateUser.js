require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const LogHist = require("../models/LogHist");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      await User.create({
        name: req.body.name,
        password: secPassword, //instead of req.body.password
        realPassword: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });

      await LogHist.create({
        log: "signup",
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
        date: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      });

      console.log(
        "signup::: user email:",
        req.body.email,
        "\t req.body.password: ",
        req.body.password,
        "\t user name: ",
        req.body.name,
        "\t user loc: ",
        req.body.location,
        "\t date:",
        new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" }) +
          " " +
          new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata" }) +
          "\n"
      );
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret); // you can add time limit
      await LogHist.create({
        log: "login",
        name: user.name,
        password: req.body.password,
        email: user.email,
        location: user.location,
        date: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      });
      console.log(
        "login::: user email:",
        user.email,
        "\t req.body.password: ",
        req.body.password,
        "\t user name: ",
        user.name,
        "\t user loc: ",
        user.location,
        "\t date:",
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        "\n"
      );
      return res.json({
        success: true,
        authToken: authToken,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
