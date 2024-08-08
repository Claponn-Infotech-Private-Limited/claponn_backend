const express = require("express");
const router = express.Router();
const Message = require("../models/Form");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vishnusharma76434@gmail.com",
    pass: "hxitrnqjgffzbcdk",
  },
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    // Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Email options
    const mailOptionsToUser = {
      from: "vishnusharma2k03@gmail.com",
      to: email,
      subject: "Thank you for your message",
      text: `Hi ${name},\n\nThank you for your message. We will get back to you soon.\n\nMessage: ${message}`,
    };

    const mailOptionsToUs = {
      from: "vishnusharma2k03@gmail.com",
      to: "vishnusharma76434@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send emails
    await transporter.sendMail(mailOptionsToUser);
    await transporter.sendMail(mailOptionsToUs);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;