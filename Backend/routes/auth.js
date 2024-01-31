const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: './config.env' });
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

// Function to generate a random OTP
const generateOTP = async () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Function to send OTP via email
const sendOTPByEmail = async (email, otp) => {
  // Configure nodemailer with your email service credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Owner_Email,
      pass: process.env.Email_Password,
    },
  });

  // Create the email message
  const mailOptions = {
    from: process.env.Owner_Email,
    to: email,
    subject: "Email Confirmation OTP",
    text: `Your OTP for email confirmation is: ${otp}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

// Router 1 --> Create a new user using POST at /api/auth/CreateUser. No login required
router.post(
  "/CreateUser",
  [
    body("name", "Name is too small").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    })
  ],
  async (req, res) => {
    // If there is any error, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    try {
      // Check if any user with the email exists or not
      let existingUser = await User.findOne({ email: req.body.email });

      // If any user exists, return a bad request and error message
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      // Generate a random OTP
      const otp = await generateOTP();

      // Send OTP via email
      await sendOTPByEmail(req.body.email, otp);

    //   Function to generate a secure password i.e., Password hash
      const salt = await bcrypt.genSalt(15);

      const passwordHash = await bcrypt.hash(req.body.password, salt);

      // Save user details along with the OTP and timestamp (you may want to encrypt the OTP)
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        emailConfirmationOTP: otp,
        emailConfirmationTimestamp: new Date(),
      });

      res.json({ message: "OTP sent successfully", userId: user._id });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something went wrong! Please try after some time" });
    }
  }
);

// Router 2 --> Verify user email via otp using POST at /api/auth/verifyEmail. No login required
router.post(
  "/verifyEmail/:userId",
  [
    body("otp", "OTP must be a 6-digit number")
      .isLength({ min: 6, max: 6 })
      .isNumeric(),
  ],
  async (req, res) => {
    // If there is any error, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const userId = req.params.userId;
    try {
      // Find the user in the database based on the user ID
      const user = await User.findById(userId);
      // console.log(user)

      // If the user is not found or the OTP does not match, return an error
      if (!user || user.emailConfirmationOTP !== req.body.otp) {
        return res.status(401).json({ error: "Invalid OTP" });
      }

      // Check if the OTP has expired (e.g., after 5 minutes)
      const expirationDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
      const currentTimestamp = new Date();
      const otpTimestamp = user.emailConfirmationTimestamp;

      if (currentTimestamp - otpTimestamp > expirationDuration) {
        return res.status(401).json({ error: "OTP has expired" });
      }

      // If the OTP is correct and has not expired, mark the email as verified
      user.emailVerified = true;

      // Save the updated user details
      await user.save();

      res.send({ message: "Email verified successfully" });

    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Something went wrong! Please try after some time" });
    }

  }
);

// Router 3 --> Authenticate a user using POST at /api/auth/login. No login required
router.post("/login",[
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ], async (req, res) => {
    // If there is any error, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { email, password } = req.body;
    try {
      // Check if any user with the email exists or not
      let user = await User.findOne({ email });

      // If no user exists, return bad request with error message
      if (!user) {
        return res
          .status(401)
          .send({ error: "User not registered" });
      }

      // Check if entered password is correct or not
      let comparePassword = await bcrypt.compare(password, user.password);

      // If password is wrong, return bad request with error message
      if (!comparePassword) {
        return res
          .status(401)
          .send({ error: "Please login using correct credentials" });
      }

      const JWT_Data = {
        user: {
          id: user.id,
        },
      };

      const JWT_secret = process.env.JWT_Secret;
      const JWT_Token = jwt.sign(JWT_Data, JWT_secret);
      res.json({ success: "login successfull", authtoken: JWT_Token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something went wrong! Please try after some time" });
    }
  }
);

// Router 4 --> Fetch data of loggedin user using POST at /api/auth/getUser. Login required
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    // Search for the user using user id. User id is get by fetchuser middleware
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong! Please try after some time" });
  }
});

module.exports = router;
