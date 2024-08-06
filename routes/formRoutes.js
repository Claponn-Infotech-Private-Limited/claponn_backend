// routes/formRoutes.js
const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

// POST route to submit the form
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newForm = new Form({ name, email, message });
    const savedForm = await newForm.save();
    res.json(savedForm);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
