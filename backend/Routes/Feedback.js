const express = require("express");
const router = express.Router();
const Feedback = require("./../models/Feedback");

router.post("/feedback", async (req, res) => {
  try {
    await Feedback.create({
      rating: req.body.rating,
      email: req.body.email,
      message: req.body.message,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
router.post("/getFeedback", async (req, res) => {
  try {
    const response = await Feedback.find({});
    res.json({ response: response });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
